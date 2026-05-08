#!/bin/bash
set -euxo pipefail

cd /var/www/xlh-mexico

UPLOADS_PERSIST="/var/www/xlh-mexico-uploads"
mkdir -p "$UPLOADS_PERSIST/uploads" "$UPLOADS_PERSIST/especialistas"

git fetch origin master
git reset --hard origin/master

# Restore persistent upload symlinks (wiped by git reset --hard)
ln -sfn "$UPLOADS_PERSIST/uploads" public/uploads
ln -sfn "$UPLOADS_PERSIST/especialistas" public/img/especialistas

npm ci
npm run build
npx prisma migrate deploy
pm2 restart ecosystem.config.js --update-env

echo "Deploy completed successfully"
