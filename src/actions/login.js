import types from '../action-types/login';
import { Api } from '../services/index';

export default {
	[types.SET_LOGIN_NICK](dispatch, nick) {
		dispatch({
			type: types.SET_LOGIN_NICK,
			nick
		});
	},

	[types.SET_LOGIN_PWD](dispatch, pwd) {
		dispatch({
			type: types.SET_LOGIN_PWD,
			pwd
		});
	},

	[types.SEND_LOGIN_REQUEST](dispatch, nick, pwd) {
		dispatch({
			type: types.SEND_LOGIN_REQUEST,
			nick,
			pwd
		});
		return Api.login(nick, pwd);
	},

	[types.RECEIVE_LOGIN_SUCCESS](dispatch) {
		dispatch({
			type: types.RECEIVE_LOGIN_SUCCESS
		});
	},

	[types.RECEIVE_LOGIN_ERROR](dispatch) {
		dispatch({
			type: types.RECEIVE_LOGIN_ERROR
		});
	}
};