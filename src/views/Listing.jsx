import path from 'path'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { load as loadListing } from '../actions/listingActions'
import * as listingActions from '../actions/listingActions'
import { isLoaded as isListingLoaded } from '../reducers/listing'
import { AMOUNT, PERIOD, FILTER } from '../constants/defaultProps'

const styles = (function getStyle() {
	const stats = require('../../webpack-stats.json')
	if (__CLIENT__) {
		return require('./listing.styl')
	}

	return stats.css.modules[path.join(__dirname, './listing.styl')]
})()

export default class Listing extends Component {

	filterChange({key, type}) {
		const {query, load} = this.props
		query[key] = type
		load(query)
	}

	render() {
		const {loading, listings, query, amountChange, periodChange, load} = this.props
		const {page, amount, period} = query
		return (
			<div>
				<h1 className={styles.header}>
					{JSON.stringify(query)}
				</h1>
				<Link to={"/listing/auto"}>toAuto</Link>
				<Link to={"/recommend/house"}>toRecommend</Link>
				<div>
					{Object.keys(FILTER).map(key => (
						<div>
							<h3>{key}</h3>
							<ul>
								<li className={query[key] ? '' : 'selected'}>
									<a href="javascript:void(0)" onClick={this.filterChange.bind(this, {key, type: null})}>不限</a>
								</li>
								{FILTER[key].map(type => (
									<li className={query[key] === type? 'selected' : ''}>
										<a href="javascript:void(0)" onClick={this.filterChange.bind(this, {key, type})}>{type}</a>
									</li>
								))}
							</ul>
						</div>
						))}
				</div>
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