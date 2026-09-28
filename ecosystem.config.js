// PM2 Ecosystem Config — VPS Production
// Usage: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'xavfsizmaktab',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/xavfsizmaktab',
      instances: 1,           // 1 instance for small VPS (2 CPU → 2 for more)
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/xavfsizmaktab-error.log',
      out_file: '/var/log/pm2/xavfsizmaktab-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      time: true,
    },
  ],
};
