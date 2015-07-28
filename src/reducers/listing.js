import {
	AMOUNT_CHANGE,
	PERIOD_CHANGE,
	QUERY_LOAD,
	QUERY_LOAD_SUCCESS,
	QUERY_LOAD_FAIL
} from '../constants/actionTypes'

const initialState = {
	loaded: false
}

export default function listing(state = initialState, action = {}) {
	switch (action.type) {
		case AMOUNT_CHANGE:
			return {
				...state,
				query: {
					...state.query,
					amount: action.amount
				}
			}
		case PERIOD_CHANGE:
			return {
				...state,
				query: {
					...state.query,
					period: action.period
				}
			}
		case QUERY_LOAD:
			return {
				...state,
				query: action.query,
				loading: true
			}
		case QUERY_LOAD_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.result
			}
		case QUERY_LOAD_FAIL:
			return {
				...state,
				loaded: false,
				loading: false,
				data: action.result
			}
		default:
			return state
	}
}

export function isLoaded(globalState, type) {
	return globalState.listing && globalState.listing.loaded && globalState.listing.query && globalState.listing.query.type == type
}