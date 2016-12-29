import * as types from '../action-types/login';
import { Api } from '../services/index';

export const setLoginNick = (dispatch, nick) => {
	dispatch({ type: types.SET_LOGIN_NICK, nick });
};

export const setLoginPwd = (dispatch, pwd) => {
	dispatch({ type: types.SET_LOGIN_PWD, pwd });
};

export const loginRequest = (dispatch, nick, pwd) => {
	dispatch({ type: types.LOGIN_REQUEST, nick, pwd });
	return Api.login(nick, pwd);
};

export const loginSuccess = dispatch => {
	dispatch({ type: types.LOGIN_SUCCESS });
};

export const loginError = dispatch => {
	dispatch({ type: types.LOGIN_ERROR });
};