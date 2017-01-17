import types from './types';
import { Api } from '../../services/index';

export const setAuthNick = nick => dispatch => {
	dispatch({
		type: types.SET_AUTH_NICK,
		nick
	});
};

export const setAuthPwd = pwd => dispatch => {
	dispatch({
		type: types.SET_AUTH_PWD,
		pwd
	});
};

export const setAuthSaveCreds = saveCreds => dispatch => {
	dispatch({
		type: types.SET_AUTH_SAVE_CREDS,
		saveCreds
	});
};

export const login = () => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		dispatch({
			type: types.LOGIN
		});
		const { nick, pwd, saveCreds } = getState().auth;
		try {
			await Api.login(nick, pwd, saveCreds);
			dispatch(loginSuccess());
			resolve();
		} catch (exc) {
			dispatch(loginError());
			reject();
		}
	});
};

const loginSuccess = () => ({
	type: types.LOGIN_SUCCESS
});

const loginError = () => ({
	type: types.LOGIN_ERROR
});

export const loginSilently = () => async (dispatch, getState) => {
	dispatch({
		type: types.LOGIN_SILENTLY
	});
	try {
		const { nick, pwd, saveCreds } = await Api.loginSilently();
		dispatch(loginSilentlySuccess(nick, pwd, saveCreds));
	} catch (exc) {
		dispatch(loginSilentlyError());
	}
};

const loginSilentlySuccess = (nick, pwd, saveCreds) => ({
	type: types.LOGIN_SILENTLY_SUCCESS,
	nick,
	pwd,
	saveCreds
});

const loginSilentlyError = () => ({
	type: types.LOGIN_SILENTLY_ERROR
});