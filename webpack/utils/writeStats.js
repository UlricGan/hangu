var fs = require('fs')
var path = require('path')

var filepath = path.resolve(__dirname, '../../webpack-stats.json')

module.exports = function writeStats(stats) {

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
	var css = getChunks('main', 'css')

	var content = {
		script: script,
		css: css
	}

	fs.writeFileSync(filepath, JSON.stringify(content))

}