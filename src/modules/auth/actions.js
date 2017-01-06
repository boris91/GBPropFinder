import types from './types';
import { Api } from '../../services/index';

export default {
	[types.SET_AUTH_NICK]: nick => dispatch => {
		dispatch({
			type: types.SET_AUTH_NICK,
			nick
		});
	},

	[types.SET_AUTH_PWD]: pwd => dispatch => {
		dispatch({
			type: types.SET_AUTH_PWD,
			pwd
		});
	},

	[types.SEND_AUTH_REQUEST]: (nick, pwd) => dispatch => {
		dispatch({
			type: types.SEND_AUTH_REQUEST,
			nick,
			pwd
		});
		return Api.auth(nick, pwd);
	},

	[types.RECEIVE_AUTH_SUCCESS]: () => dispatch => {
		dispatch({
			type: types.RECEIVE_AUTH_SUCCESS
		});
	},

	[types.RECEIVE_AUTH_ERROR]: () => dispatch => {
		dispatch({
			type: types.RECEIVE_AUTH_ERROR
		});
	}
};