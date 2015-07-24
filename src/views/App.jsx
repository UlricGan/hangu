import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { createTransitionHook } from '../universalRouter'

export default class App extends Component {
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