import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { createTransitionHook } from '../universalRouter'
import { isLoaded as isInfoLoaded } from '../reducers/info'
import { load as loadInfo } from '../actions/infoActions'

class App extends Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	}

	componentWillMount() {
		const { router, store } = this.context
		router.addTransitionHook(createTransitionHook(store))
	}

	render() {
		return (
			<div className="app">
				<div className="topbar">This is tobar</div>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default class AppContainer {

	static fetchData(store) {
		const promises = []
		if (!isInfoLoaded(store.getState())) {
			promises.push(store.dispatch(loadInfo()))
		}
		return Promise.all(promises)
	}

	render() {

		return (
			<App>
				{this.props.children}
			</App>
		)
	}
}

