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

export const sendAuthRequest = (onSuccess, onError) => async (dispatch, getState) => {
	dispatch({
		type: types.SEND_AUTH_REQUEST
	});
	const { nick, pwd } = getState().auth;
	try {
		await Api.auth(nick, pwd);
		dispatch(receiveAuthSuccess());
		onSuccess();
	} catch(exc) {
		dispatch(receiveAuthError());
		onError();
	}
};

const receiveAuthSuccess = () => ({
	type: types.RECEIVE_AUTH_SUCCESS
});

const receiveAuthError = () => ({
	type: types.RECEIVE_AUTH_ERROR
});