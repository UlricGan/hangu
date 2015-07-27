import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { load as loadListing } from '../actions/listingActions'
import * as listingActions from '../actions/listingActions'
import { isLoaded as isListingLoaded } from '../reducers/listing'
import { AMOUNT, PERIOD } from '../constants/defaultProps'

export default class Listing extends Component {
	render() {
		const {loading, listings, query, amountChange, periodChange, load} = this.props
		const {page, amount, period} = query
		return (
			<div>
				<h1>
					{JSON.stringify(query)}
				</h1>
				<input type="text" value={amount} onChange={(e) => {amountChange(e.target.value)}} />
				<input type="text" value={period} onChange={(e) => {periodChange(e.target.value)}} />
				<button onClick={() => {load(query)}}>search</button>
				<div>
					{JSON.stringify(listings)}
				</div>
			</div>
		)
	}
}

@connect(state => ({
	listings: state.listing.data,
	query: state.listing.query,
	loading: state.listing.loading
}))
export default class ListingContainer {
	static fetchData(store, routeParams) {
		let promises = []
		if (!isListingLoaded(store.getState())) {
			const query = {
				page: 0,
				amount: AMOUNT[routeParams.listType],
				period: PERIOD[routeParams.listType],
				type: routeParams.listType
			}
			promises.push(store.dispatch(loadListing(query)))
		}

		return Promise.all(promises)
	}

	render() {
		const {listings, query, loading, dispatch} = this.props
		return <Listing listings={listings} query={query}
		                loading={loading} {...bindActionCreators(listingActions, dispatch)} />
	}
}