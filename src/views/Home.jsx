import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as infoActions from '../actions/infoActions'

class Home {
	static propTypes = {
		info: PropTypes.object,
		load: PropTypes.func.isRequired
	}

	render() {
		const { info, load } = this.props
		return (
			<div>
				Get something from api
				<p>
					<strong>{info.text}</strong>
				</p>
				<button onClick={load}>Reget from api</button>
			</div>
		)
	}
}

@connect(state => ({
	info: state.info.data
}))
export default class HomeContainer {
	static propTypes = {
		info: PropTypes.object,
		dispatch: PropTypes.func.isRequired
	}

	render() {
		const { info, dispatch } = this.props
		return <Home info={info} {...bindActionCreators(infoActions, dispatch)} />
	}
}