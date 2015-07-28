import React from 'react'
import Router from 'react-router'
import routes from './views/routes'
import { Provider } from 'react-redux'

const getFetchData = (component) => {
	return component.fetchData || (component.DecoratedComponent && component.DecoratedComponent.fetchData)
}

export function createTransitionHook(store) {
	return (nextState, transition, callback) => {
		Promise.all(nextState.branch
			.map(route => route.component)
			.filter(component => getFetchData(component))
			.map(getFetchData)
			.map(fetchData => {
				return fetchData(store, nextState.params)
			}))
			.then(() => {
				callback()
			}, (error) => {
				callback(error)
			})
	}
}

export default function universalRouter(location, history, store) {
	return new Promise((resolve, reject) => {
		Router.run(routes, location, [createTransitionHook(store)], (error, initialState, transition) => {
			if (error) {
				reject(error)
			} else {
				if (transition && transition.redirectInfo) {
					resolve({
						transition,
						isRedirect: true
					})
				} else {
					if (history) {
						initialState.history = history
					}

					const component = (
						<Provider store={store} key="provider">
							{() => <Router {...initialState} children={routes} />}
						</Provider>
					)
					resolve({
						component,
						isRedirect: false
					})
				}
			}
		})
	})
}
