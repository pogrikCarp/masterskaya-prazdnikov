#!/usr/bin/env bash
#
# setup-server.sh — первичная подготовка Ubuntu-сервера для CI/CD.
# Устанавливает Node.js, PostgreSQL, Nginx и systemd-сервис.
#
# ВАЖНО: до запуска вручную создайте /opt/myapp/.env.
# Скрипт никогда не создаёт и не перезаписывает .env.
#
# Пример:
#   bash deploy/setup-server.sh prazdniki.studio

set -euo pipefail

REPO_URL="https://github.com/pogrikCarp/masterskaya-prazdnikov.git"
APP_DIR="/opt/myapp"
APP_NAME="masterskaya-prazdnikov"
APP_PORT="3002"
NODE_MAJOR="20"
DOMAIN="${1:-}"

log() { echo -e "\n\033[1;32m==> $1\033[0m"; }

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Запустите скрипт от root." >&2
  exit 1
fi

log "Проверка памяти и swap"
TOTAL_MEM_KB="$(awk '/MemTotal/ {print $2}' /proc/meminfo)"
if [[ "$TOTAL_MEM_KB" -lt 3000000 ]] && ! swapon --show | grep -q .; then
  log "Мало RAM — создаю 2GB swap-файл, чтобы npm run build не падал с OOM"
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  if ! grep -q '/swapfile' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' >>/etc/fstab
  fi
fi

log "Обновление системы и установка базовых пакетов"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git ufw build-essential ca-certificates gnupg lsb-release

if ! command -v node >/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_MAJOR" ]]; then
  log "Установка Node.js ${NODE_MAJOR}.x"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
else
  log "Node.js уже установлен: $(node -v)"
fi

log "Установка PostgreSQL"
apt-get install -y postgresql postgresql-contrib
systemctl enable --now postgresql

log "Получение кода приложения из ${REPO_URL}"
install -d -o root -g root -m 755 "$(dirname "$APP_DIR")"
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch origin main
  git -C "$APP_DIR" reset --hard origin/main
else
  git clone "$REPO_URL" "$APP_DIR"
fi
chown root:root "$APP_DIR"
chmod 755 "$APP_DIR"

if [[ ! -f "$APP_DIR/.env" ]]; then
  echo "Не найден $APP_DIR/.env. Создайте его вручную по инструкции и запустите скрипт повторно." >&2
  exit 1
fi
chmod 600 "$APP_DIR/.env"

set -a
# shellcheck disable=SC1090
source "$APP_DIR/.env"
set +a

for variable in POSTGRES_DB POSTGRES_USER POSTGRES_PASSWORD DATABASE_URL; do
  if [[ -z "${!variable:-}" ]]; then
    echo "В $APP_DIR/.env не задана переменная $variable." >&2
    exit 1
  fi
done

if [[ ! "$POSTGRES_DB" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]] || [[ ! "$POSTGRES_USER" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]]; then
  echo "POSTGRES_DB и POSTGRES_USER могут содержать только буквы, цифры и _." >&2
  exit 1
fi

POSTGRES_PASSWORD_SQL="${POSTGRES_PASSWORD//\'/\'\'}"
if ! runuser -u postgres -- psql -tAc "SELECT 1 FROM pg_roles WHERE rolname = '$POSTGRES_USER'" | grep -q 1; then
  runuser -u postgres -- psql -v ON_ERROR_STOP=1 -c "CREATE ROLE \"$POSTGRES_USER\" LOGIN PASSWORD '$POSTGRES_PASSWORD_SQL';"
else
  runuser -u postgres -- psql -v ON_ERROR_STOP=1 -c "ALTER ROLE \"$POSTGRES_USER\" WITH PASSWORD '$POSTGRES_PASSWORD_SQL';"
fi
if ! runuser -u postgres -- psql -tAc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'" | grep -q 1; then
  runuser -u postgres -- createdb -O "$POSTGRES_USER" "$POSTGRES_DB"
fi

log "Установка и настройка Nginx"
apt-get install -y nginx

NGINX_SERVER_NAME="${DOMAIN:-_}"
cat >/etc/nginx/sites-available/"$APP_NAME" <<EOF
server {
    listen 80;
    server_name ${NGINX_SERVER_NAME};

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/"$APP_NAME" /etc/nginx/sites-enabled/"$APP_NAME"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable --now nginx
systemctl reload nginx

log "Настройка firewall (UFW)"
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

log "Установка systemd-сервиса"
install -m 644 "$APP_DIR/deploy/masterskaya-prazdnikov.service" \
  "/etc/systemd/system/${APP_NAME}.service"
systemctl daemon-reload
systemctl enable "$APP_NAME"

if [[ -n "$DOMAIN" ]]; then
  log "Установка Certbot и выпуск SSL-сертификата для ${DOMAIN}"
  apt-get install -y certbot python3-certbot-nginx
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN}" --redirect || \
    echo "Certbot не смог выпустить сертификат автоматически — проверьте, что DNS-запись домена указывает на этот сервер, и запустите вручную: certbot --nginx -d $DOMAIN"
else
  log "Домен не передан — SSL пропущен."
fi

log "Первичная настройка завершена. Запускаю первый деплой."
bash "$APP_DIR/deploy/deploy-server.sh"
