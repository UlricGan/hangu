import path from 'path'

const getStyle = (function() {
	return (pathname, dirname) => {
		const stats = require('../webpack-stats.json')
		return stats.css.modules[path.join(dirname, pathname)]
	}
})()

export default getStyle