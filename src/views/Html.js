import React, {Component, PropTypes} from 'react'
import serialize from 'serialize-javascript'

export default class Html extends Component {
	static propTypes = {
		webpackStats: PropTypes.object,
		component: PropTypes.object,
		store: PropTypes,
	}

	render() {
		const {component, store, webpackStats} = this.props
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<title>函谷</title>
					{webpackStats.css.map((css, i) => <link href={css} ref={i}
				                       rel="stylesheet" type="text/css" />)}
				</head>
				<body>
					<div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}} />
					<script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())}`}} />
					<script src={webpackStats.script[0]} />
				</body>
			</html>
		)
	}
}