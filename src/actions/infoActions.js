import {
	INFO_LOAD,
	INFO_LOAD_SUCCESS,
	INFO_LOAD_ERROR
} from '../constants/actionTypes'

export function load() {
	return {
		types: [INFO_LOAD, INFO_LOAD_SUCCESS, INFO_LOAD_ERROR],
		promise: (client) => client.get('/loadInfo')
	}
}