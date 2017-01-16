import types from './types';
import { Storage } from '../../services/index';

export const sendStorageItemsRequest = () => (dispatch, getState) => {
	dispatch({
		type: types.SEND_STORAGE_ITEMS_REQUEST
	});
	return new Promise(async (resolve, reject) => {
		try {
			const items = await Storage.getItems();
			dispatch(receiveStorageItemsSuccess(items));
			resolve(items);
		} catch (exc) {
			dispatch(receiveStorageItemsError());
			reject();
		}
	});
};

const receiveStorageItemsSuccess = items => ({
	type: types.RECEIVE_STORAGE_ITEMS_SUCCESS,
	items
});

const receiveStorageItemsError = () => ({
	type: types.RECEIVE_STORAGE_ITEMS_ERROR
});

export const setStorageItem = (key, value) => async (dispatch, getState) => {
	dispatch({
		type: types.SET_STORAGE_ITEM
	});
	try {
		const items = await Storage.set(key, value);
		dispatch(setStorageItemSuccess(key, value));
	} catch (exc) {
		dispatch(setStorageItemError(key, value));
	}
};

const setStorageItemSuccess = (key, value) => ({
	type: types.SET_STORAGE_ITEM_SUCCESS,
	key,
	value
});

const setStorageItemError = (key, value) => ({
	type: types.SET_STORAGE_ITEM_ERROR,
	key,
	value
});