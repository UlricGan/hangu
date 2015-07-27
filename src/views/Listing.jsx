import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { load as loadListing } from '../actions/listingActions'
import * as listingActions from '../actions/listingActions'
import { isLoaded as isListingLoaded } from '../reducers/listing'

export default class Listing extends Component {
	render() {
		const {loading, listings, query} = this.props
		return (
			<div>
				<h1>
					{JSON.stringify(query)}
				</h1>
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
			promises.push(store.dispatch(loadListing(store.query)))
		}

		return Promise.all(promises)
	}

	render() {
		const {listings, query, loading, dispatch} = this.props
		return <Listing listings={listings} query={query}
		                loading={loading} {...bindActionCreators(listingActions, dispatch)} />
	}
}