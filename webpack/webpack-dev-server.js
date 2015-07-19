var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var config = require('./dev.config')

var host = 'localhost'
var port = 3001

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {color: true}
}

var compiler = webpack(config)
var webpackDevServer = new WebpackDevServer(compiler, serverOptions)

webpackDevServer.listen(port, host, function() {
	console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
})