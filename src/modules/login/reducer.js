import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_LOGIN_NICK:
			return {
				...state,
				nick: action.nick
			};

		case types.SET_LOGIN_PWD:
			return {
				...state,
				pwd: action.pwd
			};

		case types.SEND_LOGIN_REQUEST:
			return {
				...state,
				pending: true,
				error: false
			};

		case types.RECEIVE_LOGIN_SUCCESS:
			return {
				...state,
				pending: false
			};

		case types.RECEIVE_LOGIN_ERROR:
			return {
				...state,
				pending: false,
				error: true
			};

		default:
			return state;
	}
};