require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'Flynote',
      script: 'index.js',
      instances: 2,
      instance_var: 'INSTANCE_ID',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};