import * as types from '../action-types/login';
import initialState from '../store/initial-state/login';

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

		case types.LOGIN_REQUEST:
			return {
				...state,
				pending: true,
				error: false
			};

		case types.LOGIN_SUCCESS:
			return {
				...state,
				pending: false
			};

		case types.LOGIN_ERROR:
			return {
				...state,
				pending: false,
				error: true
			};

		default:
			return state;
	}
};