import { Api } from '../services/index';
import * as types from '../action-types/login';

export const loginRequest = (nick, pwd) => ([
	{
		type: types.LOGIN_REQUEST,
		nick,
		pwd
	},
	Api.login(nick, pwd)
]);

export const loginSuccess = () => ({
	type: types.LOGIN_SUCCESS
});

export const loginError = () => ({
	type: types.LOGIN_ERROR
});