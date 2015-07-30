var fs = require('fs')
var path = require('path')

var filepath = path.resolve(__dirname, '../../webpack-stats.json')

module.exports = function writeStats(stats, env) {

	var publicPath = this.options.output.publicPath
	var json = stats.toJson()

	function getChunks(name, ext) {
		ext = ext || 'js'
		var chunk = json.assetsByChunkName[name]

		if (!(Array.isArray(chunk))) {
			chunk = [chunk]
		}

		return chunk
			.filter(function (chunkName) {
				return path.extname(chunkName) === '.' + ext
			})
			.map(function (chunkName) {
				return publicPath + chunkName
			})
	}

	var script = getChunks('main', 'js')
	var cssFiles = getChunks('main', 'css')

	var cssModules = {}


  var namePrefix = "./~/css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!./~/postcss-loader!"

	json.modules.filter(function(m) {
		if (env === 'prod') {
			return /\.styl$/.test(m.name)
		}

		return m.name.slice(0, namePrefix.length) === namePrefix
	}).forEach(function(m) {
		var name = path.resolve(__dirname, '../../', env === 'prod' ? m.name : m.name.slice(namePrefix.length))
		var regex = env === 'prod' ? /module\.exports = ((.|\n)+);/ : /exports\.locals = ((.|\n)+);/
		var match = m.source.match(regex)
		cssModules[name] = match ? JSON.parse(match[1]) : {}
	})

	var content = {
		script: script,
		css: {
			files: cssFiles,
			modules: cssModules
		}
	}

	fs.writeFileSync(filepath, JSON.stringify(content))

}