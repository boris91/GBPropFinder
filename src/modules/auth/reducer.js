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

		case types.SET_AUTH_SAVE_CREDS:
			return {
				...state,
				saveCreds: action.saveCreds
			};

		case types.LOGIN:
			return {
				...state,
				complete: false,
				pending: true,
				error: false
			};

		case types.LOGIN_SUCCESS:
			return {
				...state,
				complete: true,
				pending: false
			};

		case types.LOGIN_ERROR:
			return {
				...state,
				pending: false,
				error: true
			};

		case types.LOGIN_SILENTLY:
			return {
				...state,
				complete: false,
				pending: true,
				error: false
			};

		case types.LOGIN_SILENTLY_SUCCESS:
			return {
				...state,
				complete: true,
				pending: false,
				nick: action.nick,
				pwd: action.pwd,
				saveCreds: action.saveCreds
			};

		case types.LOGIN_SILENTLY_ERROR:
			return {
				...state,
				pending: false
			};

		default:
			return state;
	}
};