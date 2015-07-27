/* global __SERVER__ */
import superagent from 'superagent'
import config from '../config'

class ApiClient_ {
	constructor(req) {
		['get', 'post', 'put', 'patch', 'del'].
			forEach((method) => {
				this[method] = (path, options) => {
					return new Promise((resolve, reject) => {
						const request = superagent[method](formatUrl(path))
						if (options && options.params) {
							request.query(options.params)
						}
						if (__SERVER__) {
							if (req.get('cookie')) {
								request.set('cookie', req.get('cookie'))
							}
						}
						if (options && options.data) {
							request.send(options.data)
						}
						request.end((err, res) => {
							if (err) {
								reject((res && res.body) || err)
							} else {
								resolve(res.body)
							}
						})
					})
				}
			})
	}
}

function formatUrl(path) {
	const adjustedPath = path[0] !== '/' ? '/' + path : path
	if (__CLIENT__) {
		return `/api${adjustedPath}`
	} else {
		return `http://${config.apiHost}:${config.apiPort}/api${adjustedPath}`
	}
}

// 据说这样可以解决ApiClient undefinded的问题
const ApiClient = ApiClient_

export default ApiClient