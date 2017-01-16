import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SEND_STORAGE_ITEMS_REQUEST:
			return {
				...state,
				complete: false,
				pending: true,
				error: false
			};

		case types.RECEIVE_STORAGE_ITEMS_SUCCESS:
			return {
				...state,
				complete: true,
				pending: false,
				items: action.items
			};

		case types.RECEIVE_STORAGE_ITEMS_ERROR:
			return {
				...state,
				pending: false,
				error: true,
				items: null
			};

		default:
			return state;
	}
};