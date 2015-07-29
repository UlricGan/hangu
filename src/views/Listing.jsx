import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { load as loadListing } from '../actions/listingActions'
import * as listingActions from '../actions/listingActions'
import { isLoaded as isListingLoaded } from '../reducers/listing'
import { AMOUNT, PERIOD, FILTER } from '../constants/defaultProps'
import getStyle from '../styleLoad'

import Filter from './components/filter'

const style = __CLIENT__ ?
	require('../styles/listing.styl') :
	getStyle('../styles/listing.styl', __dirname)

export default class Listing extends Component {

	render() {
		const {loading, listings, query, amountChange, periodChange, load} = this.props
		const {page, amount, period} = query
		return (
			<div>
				<h2>hello</h2>
				<h1 className={style.header}>
					{JSON.stringify(query)}
				</h1>
				<Link to={"/listing/auto"}>toAuto</Link>
				<Link to={"/recommend/house"}>toRecommend</Link>
				<Filter {...this.props} filters={FILTER} />
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
		if (!isListingLoaded(store.getState(), routeParams.listType)) {
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