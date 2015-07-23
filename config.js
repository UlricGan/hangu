module.exports = {
  development: {
    staticHost: 'ganhongxiang.jinrong.baixing.net',
    staticPort: 3002,
    apiHost: '127.0.0.1',
    apiPort: 58000
  },
  production: {
    apiHost: '127.0.0.1',
    apiPort: 58000
    // todo config host and port
  }
}[process.env.NODE_ENV || 'development'];