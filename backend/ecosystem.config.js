module.exports = {
  apps : [
    {
      name: 'Whitelist API',
      script: 'server.js',
      instances: 1,
      autorestart: false,
      watch: true,
      max_memory_restart: '512M'
    },
    {
      name: 'Whitelist Bot',
      script: 'bot.js',
      instances: 1,
      autorestart: false,
      watch: true,
      max_memory_restart: '512M',
    }
  ],
};
