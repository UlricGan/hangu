import {
	AMOUNT_CHANGE,
	PERIOD_CHANGE,
	QUERY_LOAD,
	QUERY_LOAD_SUCCESS,
	QUERY_LOAD_FAIL
} from '../constants/actionTypes'

export function amountChange(amount) {
	return {
		type: AMOUNT_CHANGE,
		amount
	}
}

export function periodChange(period) {
	return {
		type: PERIOD_CHANGE,
		period
	}
}

export function load(query) {
	return {
		types: [QUERY_LOAD, QUERY_LOAD_SUCCESS, QUERY_LOAD_FAIL],
		query,
		promise: (client) => client.get('/getListingAds', {params: {...query}})
	}
}