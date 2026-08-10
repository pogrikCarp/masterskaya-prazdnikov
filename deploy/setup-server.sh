#!/usr/bin/env bash
#
# setup-server.sh — подготовка чистого Ubuntu-сервера (22.04/24.04) и деплой
# сайта "Мастерская праздников" (Next.js + Prisma + PostgreSQL + Nginx + PM2).
#
# Запуск (от root или через sudo):
#   sudo bash setup-server.sh [домен]
#
# Пример:
#   sudo bash setup-server.sh prazdniki.studio
#   sudo bash setup-server.sh            # без домена — Nginx слушает по IP, без SSL
#
# Скрипт идемпотентен: повторный запуск безопасен (обновит код и перезапустит сервис).

set -euo pipefail

# ---------------------------------------------------------------------------
# Настройки — при необходимости поменяйте перед запуском
# ---------------------------------------------------------------------------
REPO_URL="https://github.com/pogrikCarp/masterskaya-prazdnikov.git"
APP_DIR="/var/www/masterskaya-prazdnikov"
APP_NAME="masterskaya-prazdnikov"
APP_PORT="3002"
NODE_MAJOR="20"

DB_NAME="masterskaya"
DB_USER="masterskaya"
DB_PASS="$(tr -dc 'A-Za-z0-9' </dev/urandom | head -c 24)"

DOMAIN="${1:-}"
CREDENTIALS_FILE="/root/${APP_NAME}-credentials.txt"

log() { echo -e "\n\033[1;32m==> $1\033[0m"; }

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Запустите скрипт с правами root (sudo bash setup-server.sh)" >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# 0. Своп-файл — на маленьких VPS (1-2 ГБ RAM) сборка Next.js падает с OOM
# ---------------------------------------------------------------------------
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

# ---------------------------------------------------------------------------
# 1. Базовые пакеты и обновление системы
# ---------------------------------------------------------------------------
log "Обновление системы и установка базовых пакетов"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl git ufw build-essential ca-certificates gnupg lsb-release

# ---------------------------------------------------------------------------
# 2. Node.js (NodeSource)
# ---------------------------------------------------------------------------
if ! command -v node >/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_MAJOR" ]]; then
  log "Установка Node.js ${NODE_MAJOR}.x"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
else
  log "Node.js уже установлен: $(node -v)"
fi

log "Установка PM2 (менеджер процессов Node.js)"
npm install -g pm2

# ---------------------------------------------------------------------------
# 3. PostgreSQL
# ---------------------------------------------------------------------------
log "Установка PostgreSQL"
apt-get install -y postgresql postgresql-contrib
systemctl enable --now postgresql

log "Настройка базы данных и пользователя PostgreSQL"
sudo -u postgres psql -v ON_ERROR_STOP=1 <<-SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASS}';
  ELSE
    ALTER ROLE ${DB_USER} WITH PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;
SQL

if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1; then
  sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"
fi
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"

DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}?schema=public"

# ---------------------------------------------------------------------------
# 4. Клонирование / обновление кода приложения
# ---------------------------------------------------------------------------
log "Получение кода приложения из ${REPO_URL}"
mkdir -p "$(dirname "$APP_DIR")"
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" pull --ff-only
else
  git clone "$REPO_URL" "$APP_DIR"
fi

log "Запись .env"
cat >"$APP_DIR/.env" <<EOF
DATABASE_URL="${DATABASE_URL}"
NODE_ENV=production
EOF

# ---------------------------------------------------------------------------
# 5. Установка зависимостей, миграции, сборка
# ---------------------------------------------------------------------------
log "npm ci"
cd "$APP_DIR"
npm ci

log "Применение миграций Prisma к PostgreSQL"
npx prisma generate
npx prisma migrate deploy

log "Сборка Next.js (production build)"
npm run build

# ---------------------------------------------------------------------------
# 6. PM2 — запуск и автозапуск при перезагрузке сервера
# ---------------------------------------------------------------------------
log "Запуск приложения через PM2"
if pm2 list | grep -q "$APP_NAME"; then
  pm2 restart "$APP_NAME"
else
  pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save
env PATH="$PATH:/usr/bin" pm2 startup systemd -u root --hp /root >/dev/null

# ---------------------------------------------------------------------------
# 7. Nginx — обратный проксирующий сервер
# ---------------------------------------------------------------------------
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

# ---------------------------------------------------------------------------
# 8. Firewall (UFW)
# ---------------------------------------------------------------------------
log "Настройка firewall (UFW)"
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

# ---------------------------------------------------------------------------
# 9. SSL (Let's Encrypt) — только если передан домен
# ---------------------------------------------------------------------------
if [[ -n "$DOMAIN" ]]; then
  log "Установка Certbot и выпуск SSL-сертификата для ${DOMAIN}"
  apt-get install -y certbot python3-certbot-nginx
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN}" --redirect || \
    echo "Certbot не смог выпустить сертификат автоматически — проверьте, что DNS-запись домена указывает на этот сервер, и запустите вручную: certbot --nginx -d $DOMAIN"
else
  log "Домен не передан — SSL пропущен. Позже: sudo bash setup-server.sh ваш-домен.ru"
fi

# ---------------------------------------------------------------------------
# Итог
# ---------------------------------------------------------------------------
cat >"$CREDENTIALS_FILE" <<EOF
Дата: $(date)
DATABASE_URL=${DATABASE_URL}
Приложение: ${APP_DIR}
PM2 процесс: ${APP_NAME} (порт ${APP_PORT})
EOF
chmod 600 "$CREDENTIALS_FILE"

log "Готово!"
echo "Сайт запущен через PM2 и проксируется Nginx."
echo "Данные для подключения к БД сохранены в: ${CREDENTIALS_FILE}"
echo "Проверить статус приложения: pm2 status"
echo "Логи приложения:            pm2 logs ${APP_NAME}"
if [[ -n "$DOMAIN" ]]; then
  echo "Сайт доступен по адресу:    https://${DOMAIN}"
else
  echo "Сайт доступен по IP сервера на 80 порту."
fi
