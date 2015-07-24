import koa from 'koa'
import koaRouter from 'koa-router'
import staticCache from 'koa-static-cache'
import React from 'react'
import Location from 'react-router/lib/Location'
import { Provider } from 'react-redux'
import path from 'path'

import ApiClient from './ApiClient'
import createStore from './redux/create'
import universalRouter from './universalRouter'
import getLayout from './views/get-layout'

const app = koa()
const router = koaRouter()

let webpackStats

if (!__DEVELOPMENT__) {
  webpackStats = require('../webpack-stats.json')
}

app
	.use(router.routes())
	.use(router.allowedMethods())

router.all('/*', function *() {
	if (__DEVELOPMENT__) {
		webpackStats = require('../webpack-stats.json')
		delete require.cache[require.resolve('../webpack-stats.json')]
	}

	const client = new ApiClient(this.request)
	const store = createStore(client)
	const location = new Location(this.request.path, this.request.query)
	let component, body
	try {
		component = yield universalRouter(location, undefined, store)
	}
	catch (error) {
		this.throw(error, 500)
	}

	try {
		body = getLayout(component, store, webpackStats)
	}
	catch (error) {
		this.throw(error, 500)
	}

	this.body = body
})

try {
	app.listen(8080)
}
catch (error) {
	console.error(error)
}
console.info('==> ✅  Server is listening')
console.info('==> 🌎  %s running on port %s', 'hangu', 8080)

