#!/usr/bin/env bash
# Запускается GitHub Actions на сервере после каждого push в main.
# .env не изменяется: он хранится только в /opt/myapp/.env.

set -Eeuo pipefail

APP_DIR="/opt/myapp"
APP_NAME="masterskaya-prazdnikov"
LOCK_FILE="/var/lock/${APP_NAME}-deploy.lock"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Скрипт должен запускаться от root." >&2
  exit 1
fi

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Другой деплой уже выполняется." >&2
  exit 1
fi

cd "$APP_DIR"

if [[ ! -f .env ]]; then
  echo "Не найден $APP_DIR/.env. Деплой отменён." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

: "${DATABASE_URL:?В .env должна быть DATABASE_URL}"

echo "==> Installing locked Node.js dependencies"
npm ci

echo "==> Generating Prisma client"
npx prisma generate

echo "==> Applying Prisma migrations"
npx prisma migrate deploy

echo "==> Running lint"
npm run lint

echo "==> Building Next.js application"
npm run build

echo "==> Restarting systemd service"
systemctl daemon-reload
systemctl restart "$APP_NAME"
systemctl is-active --quiet "$APP_NAME"

echo "==> Deployment completed successfully"
