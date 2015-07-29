require('babel/register')({
	stage: 0,
	blacklist: ['regenerator'],
	plugins: ['typecheck']
})

// Define universal constants
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
delete global.__BROWSER__


if (__DEVELOPMENT__) {
	if (!require('piping')({
		hook: true,
		ignore: /(\/\.|~$|\.json|\.styl$)/i
	})) {
		return;
	}
}

require('./src/server')