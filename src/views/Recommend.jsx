import React, { Component } from 'react'
import {connect} from 'react-redux'

import { load as loadRecommend } from '../actions/recommendActions'
import { isLoaded as isRecommendLoaded } from '../reducers/recommend'

class Recommend extends Component {
	render() {
		const {loaded, loading, recommends} = this.props
		return (
			<div>
				{JSON.stringify(recommends)}
			</div>
		)
	}
}

@connect(state => ({
	recommends: state.recommend.data
}))
export default class RecommendContainer {
	static fetchData(store, routeParams) {
		let promises = []
		if (!isRecommendLoaded(store.getState())) {
			promises.push(store.dispatch(loadRecommend(routeParams)))
		}

		return Promise.all(promises)
	}

	render() {
		return <Recommend recommends={this.props.recommends} />
	}
}