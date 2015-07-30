var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip = require('strip-loader');

var writeStats = require('./utils/writeStats')

var relativeAssetsPath = '../static/dist'
var assetsPath = path.join(__dirname, '../static/dist')

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
]

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		'main': './src/client.js'
	},
	output: {
		path: assetsPath,
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/dist/'
	},
	module: {
		loaders: [
			{ test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' },
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel?stage=0&optional=runtime&plugins=typecheck']},
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss-loader')}
		]
	},
	postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ],
	resolve: {
		extensions: ['', '.json', '.js', '.jsx']
	},
	plugins: [

    new CleanPlugin([relativeAssetsPath]),

		// css 文件单独拉出来
		new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// 设几个全局变量
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false,
			'process.env': {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify('production')
			}
		}),

		// 打包过程中删除相同或类似的文件
		new webpack.optimize.DedupePlugin(),
		// Assign the module and chunk ids by occurrence count
		new webpack.optimize.OccurenceOrderPlugin(),
		// uglify
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		function () {
			this.plugin('done', function(stats) {
        writeStats.call(this, stats, 'prod')
			})
		}

	]
}