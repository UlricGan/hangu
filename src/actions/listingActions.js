import {
	AMOUNT_CHANGE,
	PERIOD_CHANGE,
	SEARCH_LOAD, SEARCH_LOAD_SUCCESS, SEARCH_LOAD_FAIL,
	FILTER_LOAD, FILTER_LOAD_SUCCESS, FILTER_LOAD_FAIL,
	NEXT_PAGE, NEXT_PAGE_SUCCESS, NEXT_PAGE_FAIL,
	PREV_PAGE, PREV_PAGE_SUCCESS, PREV_PAGE_FAIL
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
		types: [SEARCH_LOAD, SEARCH_LOAD_SUCCESS, SEARCH_LOAD_FAIL],
		query,
		promise: (client) => client.get('/getListingAds', {params: {...query}})
	}
}

export function filterChange(filter, query) {
	return {
		types: [FILTER_LOAD, FILTER_LOAD_SUCCESS, FILTER_LOAD_FAIL],
		filter,
		promise: (client) => client.get('/getListingAds', {...query})
	}
}

export function nextPage(query) {
	return {
		types: [NEXT_PAGE, NEXT_PAGE_SUCCESS, NEXT_PAGE_FAIL],
		promise: (client) => client.get('/getListingAds', {...query})
	}
}

export function prevPage(query) {
	return {
		types: [PREV_PAGE, PREV_PAGE_SUCCESS, PREV_PAGE_FAIL],
		promise: (client) => client.get('/getListingAds', {...query})
	}
}