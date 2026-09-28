#!/bin/bash
# ============================================================
# VPS DEPLOYMENT SCRIPT — xavfsizmaktab.uz
# Run this on your Contabo VPS (Ubuntu 22.04+)
# ============================================================

set -e  # Exit on error

APP_DIR="/var/www/xavfsizmaktab"
REPO_URL="https://github.com/begmurodovich-fullstack/yolharakatixavfsizligi.git"
BRANCH="main"

echo "=== 1. Update system packages ==="
sudo apt-get update -y && sudo apt-get upgrade -y

echo "=== 2. Install Node.js 20 LTS ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "=== 3. Install PM2 globally ==="
sudo npm install -g pm2

echo "=== 4. Install Nginx ==="
sudo apt-get install -y nginx

echo "=== 5. Install Certbot for SSL ==="
sudo apt-get install -y certbot python3-certbot-nginx

echo "=== 6. Clone or pull repository ==="
if [ -d "$APP_DIR" ]; then
  echo "Updating existing repo..."
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/$BRANCH
  git pull origin $BRANCH
else
  echo "Cloning fresh..."
  sudo mkdir -p "$APP_DIR"
  sudo chown -R $USER:$USER "$APP_DIR"
  git clone -b $BRANCH "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "=== 7. Install dependencies ==="
npm ci --production=false

echo "=== 8. Create .env.production ==="
echo ">>> IMPORTANT: edit .env.production with real values before continuing <<<"
if [ ! -f ".env.production" ]; then
  cp .env.production.example .env.production
  echo ">>> EDIT .env.production NOW with your database URL and secrets <<<"
  read -p "Press Enter after editing .env.production..."
fi

echo "=== 9. Build Next.js app ==="
NODE_ENV=production npm run build

echo "=== 10. Configure Nginx ==="
sudo cp nginx.conf /etc/nginx/sites-available/xavfsizmaktab
sudo ln -sf /etc/nginx/sites-available/xavfsizmaktab /etc/nginx/sites-enabled/xavfsizmaktab
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

echo "=== 11. Get SSL certificate ==="
sudo certbot --nginx -d xavfsizmaktab.uz -d www.xavfsizmaktab.uz

echo "=== 12. Start app with PM2 ==="
pm2 delete xavfsizmaktab 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

echo "=== DONE! App is running at https://xavfsizmaktab.uz ==="
pm2 status
