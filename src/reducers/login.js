import * as types from '../action-types/login';
import initialState from '../store/initial-state/login';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_REQUEST:
			return {
				...state,
				login: {
					complete: false,
					pending: true,
					error: false,
					nick: action.nick,
					pwd: action.pwd
				}
			};
			break;

		case types.LOGIN_SUCCESS:
			return {
				...state,
				login: {
					...state.login,
					complete: true,
					pending: false
				}
			};
			break;

		case types.LOGIN_ERROR:
			return {
				...state,
				login: {
					...state.login,
					complete: true,
					pending: false,
					error: true
				}
			};
			break;

		default:
			return state;
	}
};