import {
	RECOMMEND_LOAD,
	RECOMMEND_LOAD_SUCCESS,
	RECOMMEND_LOAD_FAIL
} from '../constants/actionTypes'

export function load(type) {
	return {
		types: [RECOMMEND_LOAD, RECOMMEND_LOAD_SUCCESS, RECOMMEND_LOAD_FAIL],
		promise: (client) => client.get('/getRecommendAds', {params: {type}})
	}
}