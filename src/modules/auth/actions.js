import types from './types';
import { Api } from '../../services/index';

export const setAuthNick = function(nick) {
	this.dispatch({
		type: types.SET_AUTH_NICK,
		nick
	});
};

export const setAuthPwd = function(pwd) {
	this.dispatch({
		type: types.SET_AUTH_PWD,
		pwd
	});
};

export const setAuthSaveCreds = function(saveCreds) {
	this.dispatch({
		type: types.SET_AUTH_SAVE_CREDS,
		saveCreds
	});
};

export const login = function() {
	return new Promise(async (resolve, reject) => {
		this.dispatch({
			type: types.LOGIN
		});
		const { nick, pwd, saveCreds } = this.getState().auth;
		try {
			await Api.login(nick, pwd, saveCreds);
			this.dispatch(loginSuccess());
			resolve();
		} catch (exc) {
			this.dispatch(loginError());
			reject();
		}
	});
};

export const loginSilently = async function() {
	this.dispatch({
		type: types.LOGIN_SILENTLY
	});
	try {
		const { nick, pwd } = await Api.loginSilently();
		this.dispatch(loginSilentlySuccess(nick, pwd));
	} catch (exc) {
		this.dispatch(loginSilentlyError());
	}
};

const loginSuccess = () => ({
	type: types.LOGIN_SUCCESS
});

const loginError = () => ({
	type: types.LOGIN_ERROR
});

const loginSilentlySuccess = (nick, pwd) => ({
	type: types.LOGIN_SILENTLY_SUCCESS,
	nick,
	pwd
});

const loginSilentlyError = () => ({
	type: types.LOGIN_SILENTLY_ERROR
});