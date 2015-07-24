import {
	RECOMMEND_LOAD,
	RECOMMEND_LOAD_SUCCESS,
	RECOMMEND_LOAD_ERROR
} from '../constants/actionTypes'

const initialState = {
	loaded: false
}

export default function recommend(state = initialState, action = {}) {
	switch (action.type) {
		case RECOMMEND_LOAD:
			return {
				...state,
				loading: true
			}
		case RECOMMEND_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action.result
			}
		case RECOMMEND_LOAD_ERROR:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			}
		default:
			return state
	}
}

export function isLoaded(globalState) {
	return globalState.recommend && globalState.recommend.loaded
}