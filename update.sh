#!/bin/bash
# ============================================================
# SERVER UPDATE SCRIPT — xavfsizmaktab.uz
# ============================================================
set -e

APP_DIR="/var/www/xavfsizmaktab"
echo "=== 1. Loyiha papkasiga o'tish ==="
cd "$APP_DIR" || exit 1

echo "=== 2. GitHub dan eng oxirgi o'zgarishlarni yuklash ==="
git reset --hard
git pull origin main

echo "=== 3. Paketlarni yangilash ==="
npm ci --production=false

echo "=== 4. Next.js loyihasini yig'ish (build) ==="
NODE_ENV=production npm run build

echo "=== 5. PM2 jarayonini qayta ishga tushirish ==="
pm2 restart xavfsizmaktab || pm2 start ecosystem.config.js --env production
pm2 save

echo "=== 6. Statusni tekshirish ==="
pm2 status

echo "=== BARCHASI TAYYOR! Server muvaffaqiyatli yangilandi ==="
