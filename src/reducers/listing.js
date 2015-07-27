import {
	AMOUNT_CHANGE,
	PERIOD_CHANGE,
	SEARCH_LOAD, SEARCH_LOAD_SUCCESS, SEARCH_LOAD_FAIL,
	FILTER_LOAD, FILTER_LOAD_SUCCESS, FILTER_LOAD_FAIL,
	NEXT_PAGE, NEXT_PAGE_SUCCESS, NEXT_PAGE_FAIL,
	PREV_PAGE, PREV_PAGE_SUCCESS, PREV_PAGE_FAIL
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
		case SEARCH_LOAD:
			return {
				...state,
				query: action.query,
				loading: true
			}
		case SEARCH_LOAD_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.result
			}
		case SEARCH_LOAD_FAIL:
			return {
				...state,
				loaded: false,
				loading: false,
				data: action.result
			}
		case FILTER_LOAD:
			return {
				...state,
				loading: true,
				query: {
					...state.query,
					...action.filter
				}
			}
		case FILTER_LOAD_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.result
			}
		case FILTER_LOAD_FAIL:
			return {
				...state,
				loaded: false,
				loading: false
			}
		case NEXT_PAGE:
			return {
				...state,
				loading: true,
				query: {
					...state.query,
					page: state.query.page + 1
				}
			}
		case NEXT_PAGE_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.result
			}
		case NEXT_PAGE_FAIL:
			return {
				...state,
				loaded: false,
				loading: false
			}
		case PREV_PAGE:
			return {
				...state,
				loading: true,
				query: {
					...state.query,
					page: state.query.page - 1
				}
			}
		case PREV_PAGE_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				data: action.result
			}
		case NEXT_PAGE_FAIL:
			return {
				...state,
				loaded: false,
				loading: false
			}
		default:
			return state
	}
}

export function isLoaded(globalState) {
	return globalState.listing && globalState.listing.loaded
}