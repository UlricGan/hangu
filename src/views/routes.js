import React from 'react'
import { Route } from 'react-router'

import App from './App'
import Recommend from './Recommend'
import Listing from './Listing'

export default (
	<Route component={App}>
		{/*<Route path="/" component={LoanApply} />*/}
		<Route path="/recommend/:recommendType" component={Recommend} />
		<Route path="/listing/:listType" component={Listing} />
	</Route>
)