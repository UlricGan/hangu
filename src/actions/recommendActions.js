import {
	RECOMMEND_LOAD,
	RECOMMEND_LOAD_SUCCESS,
	RECOMMEND_LOAD_ERROR
} from '../constants/actionTypes'

export function load(type) {
	return {
		types: [RECOMMEND_LOAD, RECOMMEND_LOAD_SUCCESS, RECOMMEND_LOAD_ERROR],
		promise: (client) => client.get('/getRecommendAds', {
			usage_type: type
		})
	}
}