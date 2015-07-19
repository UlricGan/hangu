import React from 'react'

export default function getLayout(component, store, webpackStats) {
	const body = '<!doctype html>\n' + React.renderToString(
		<html>
		<head>
			<meta charSet="utf-8" />
			<title>函谷</title>
			{webpackStats.css.map((css, i) => <link href={css} ref={i}
				                   rel="stylesheet" type="text/css" />)}
		</head>
		<div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}} />
		<script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(store.getState())}`}} />
		<script src={webpackStats.script[0]} />
		<body>
		</body>
		</html>
	)

	return body
}