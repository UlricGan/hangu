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

app.use(staticCache(path.join(__dirname, 'static'), {buffrt: false, maxAge: 0}))

app
	.use(router.routes())
	.use(router.allowedMethods())

router.get('/api/loadInfo', function *() {
	this.status = 200
	const num = Math.random() * 10000
	this.body = {text: `it works! ${num}`}
})

router.all('/', function *() {
	if (__DEVELOPMENT__) {
		webpackStats = require('../webpack-stats.json')
		delete require.cache[require.resolve('../webpack-stats.json')]
	}

	const client = new ApiClient(this.request)
	const store = createStore(client)
	const location = new Location(this.request.path, this.request.query)
	const component = yield universalRouter(location, undefined, store)

	const body = getLayout(component, store, webpackStats)

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

