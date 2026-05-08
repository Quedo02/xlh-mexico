module.exports = {
  apps: [{
    name: 'xlh-mexico',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/xlh-mexico',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
