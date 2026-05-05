#!/bin/bash
set -euxo pipefail

cd /var/www/xlh-mexico

git fetch origin master
git reset --hard origin/master
npm ci
npm run build
pm2 restart ecosystem.config.js --update-env

echo "Deploy completed successfully"