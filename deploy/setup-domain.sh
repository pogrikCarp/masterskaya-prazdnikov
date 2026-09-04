#!/usr/bin/env bash
#
# setup-domain.sh — привязка домена, HTTPS и подготовка SITE_URL для SEO.
#
# Перед запуском в reg.ru должны быть A-записи:
#   @   → IP этого сервера
#   www → IP этого сервера
#
# Пример:
#   cd /opt/myapp
#   bash deploy/setup-domain.sh masterskaya-prazdnika-msk.ru
#   bash deploy/setup-domain.sh masterskaya-prazdnika-msk.ru masterskaya.prazdnik@yandex.ru
#
set -euo pipefail

APP_DIR="/opt/myapp"
APP_NAME="masterskaya-prazdnikov"
APP_PORT="3002"
DOMAIN="${1:-}"
EMAIL="${2:-}"

log() { echo -e "\n\033[1;32m==> $1\033[0m"; }
warn() { echo -e "\033[1;33m⚠️  $1\033[0m"; }
die() { echo -e "\033[1;31m✖ $1\033[0m" >&2; exit 1; }

if [[ "$(id -u)" -ne 0 ]]; then
  die "Запустите скрипт от root: sudo bash deploy/setup-domain.sh ваш-домен.ru"
fi

if [[ -z "$DOMAIN" ]]; then
  die "Укажите домен. Пример: bash deploy/setup-domain.sh masterskaya-prazdnika-msk.ru"
fi

DOMAIN="${DOMAIN,,}"
DOMAIN="${DOMAIN#http://}"
DOMAIN="${DOMAIN#https://}"
DOMAIN="${DOMAIN%%/*}"
EMAIL="${EMAIL:-admin@${DOMAIN}}"
SITE_URL="https://${DOMAIN}"
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"

log "Домен: ${DOMAIN}"
log "Email для Let's Encrypt: ${EMAIL}"
log "Канонический URL: ${SITE_URL}"

# --- IP сервера ---
SERVER_IP="$(curl -4 -fsS --max-time 10 https://ifconfig.me 2>/dev/null || true)"
if [[ -z "$SERVER_IP" ]]; then
  SERVER_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
fi
[[ -n "$SERVER_IP" ]] || die "Не удалось определить IP сервера"

log "IP сервера: ${SERVER_IP}"

# --- Проверка DNS ---
resolve_a() {
  local host="$1"
  if command -v dig >/dev/null 2>&1; then
    dig +short A "$host" | grep -E '^[0-9.]+$' | head -n1 || true
  elif command -v getent >/dev/null 2>&1; then
    getent ahostsv4 "$host" | awk '{print $1; exit}' || true
  else
    python3 - <<PY 2>/dev/null || true
import socket
try:
    print(socket.gethostbyname("${host}"))
except Exception:
    pass
PY
  fi
}

log "Проверка DNS"
DOMAIN_IP="$(resolve_a "$DOMAIN")"
WWW_IP="$(resolve_a "www.$DOMAIN")"

echo "  ${DOMAIN}     → ${DOMAIN_IP:-не резолвится}"
echo "  www.${DOMAIN} → ${WWW_IP:-не резолвится}"

if [[ "$DOMAIN_IP" != "$SERVER_IP" ]]; then
  die "DNS для ${DOMAIN} ещё не указывает на ${SERVER_IP} (сейчас: ${DOMAIN_IP:-пусто}). Подождите распространения DNS и запустите снова."
fi

if [[ -n "$WWW_IP" && "$WWW_IP" != "$SERVER_IP" ]]; then
  warn "www.${DOMAIN} указывает на ${WWW_IP}, а не на ${SERVER_IP}. Сертификат для www может не выпуститься."
fi

# --- Пакеты ---
log "Установка nginx / certbot (если нужно)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y nginx certbot python3-certbot-nginx curl

# --- Nginx ---
log "Настройка Nginx для ${DOMAIN}"
install -d -m 755 /etc/nginx/sites-available /etc/nginx/sites-enabled

cat >"$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

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

ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${APP_NAME}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable --now nginx
systemctl reload nginx

# --- Firewall ---
if command -v ufw >/dev/null 2>&1; then
  log "Открытие портов Nginx в UFW"
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow "Nginx Full" >/dev/null 2>&1 || true
fi

# --- SSL ---
log "Выпуск SSL-сертификата (Let's Encrypt)"
CERTBOT_ARGS=(--nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect)
if [[ -z "$WWW_IP" || "$WWW_IP" == "$SERVER_IP" ]]; then
  CERTBOT_ARGS+=(-d "www.${DOMAIN}")
fi

certbot "${CERTBOT_ARGS[@]}"
nginx -t
systemctl reload nginx

# --- SITE_URL в .env ---
ENV_FILE="${APP_DIR}/.env"
if [[ ! -f "$ENV_FILE" ]]; then
  die "Не найден ${ENV_FILE}. Создайте .env и повторите."
fi

log "Запись SITE_URL в ${ENV_FILE}"
upsert_env() {
  local key="$1"
  local value="$2"
  local file="$3"
  if grep -qE "^${key}=" "$file"; then
    sed -i -E "s|^${key}=.*|${key}=${value}|" "$file"
  else
    printf '\n%s=%s\n' "$key" "$value" >>"$file"
  fi
}

upsert_env "SITE_URL" "$SITE_URL" "$ENV_FILE"
upsert_env "NEXT_PUBLIC_SITE_URL" "$SITE_URL" "$ENV_FILE"
chmod 600 "$ENV_FILE"

# --- Пересборка приложения (SEO metadataBase / sitemap) ---
if [[ -x "${APP_DIR}/deploy/deploy-server.sh" ]] || [[ -f "${APP_DIR}/deploy/deploy-server.sh" ]]; then
  log "Пересборка приложения с новым SITE_URL"
  bash "${APP_DIR}/deploy/deploy-server.sh"
else
  warn "deploy-server.sh не найден — перезапускаю сервис без пересборки"
  systemctl restart "$APP_NAME" || true
fi

log "Готово"
cat <<EOF

Домен настроен:
  http  → редирект на https
  https://${DOMAIN}
  https://www.${DOMAIN}

Для SEO уже записано в .env:
  SITE_URL=${SITE_URL}
  NEXT_PUBLIC_SITE_URL=${SITE_URL}

Проверьте:
  curl -I https://${DOMAIN}
  https://${DOMAIN}/robots.txt
  https://${DOMAIN}/sitemap.xml

Дальше можно спокойно править SEO в коде (title/description/страницы) —
канонический домен и sitemap уже завязаны на SITE_URL.

EOF
