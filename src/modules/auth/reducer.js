import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_AUTH_NICK:
			return {
				...state,
				nick: action.nick
			};

		case types.SET_AUTH_PWD:
			return {
				...state,
				pwd: action.pwd
			};

		case types.SEND_AUTH_REQUEST:
			return {
				...state,
				complete: false,
				pending: true,
				error: false
			};

		case types.RECEIVE_AUTH_SUCCESS:
			return {
				...state,
				complete: true,
				pending: false
			};

		case types.RECEIVE_AUTH_ERROR:
			return {
				...state,
				pending: false,
				error: true
			};

		default:
			return state;
	}
};