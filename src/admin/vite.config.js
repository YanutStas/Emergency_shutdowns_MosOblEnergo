const { mergeConfig } = require('vite');

module.exports = (config) =>
  mergeConfig(config, {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['jtv.mosoblenergo.ru'],
    },
  });
