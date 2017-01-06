import types from './types';
import { Api } from '../../services/index';

export default {
	[types.SET_SEARCH_QUERY](dispatch, query) {
		dispatch({
			type: types.SET_SEARCH_QUERY,
			query
		});
	},

	[types.RESET_SEARCH_TEMP_DATA](dispatch) {
		dispatch({
			type: types.RESET_SEARCH_TEMP_DATA
		});
	},

	[types.SELECT_SEARCH_RESULT](dispatch, selectedResultId) {
		dispatch({
			type: types.SELECT_SEARCH_RESULT,
			selectedResultId
		});
	},

	[types.SEND_SEARCH_REQUEST](dispatch, query, page) {
		dispatch({
			type: types.SEND_SEARCH_REQUEST,
			query,
			page
		});
		return Api.search(query, page);
	},

	[types.RECEIVE_SEARCH_SUCCESS](dispatch, { page, pagesCount, results }) {
		dispatch({
			type: types.RECEIVE_SEARCH_SUCCESS,
			page,
			pagesCount,
			results
		});
	},

	[types.RECEIVE_SEARCH_ERROR](dispatch, errorMessage) {
		dispatch({
			type: types.RECEIVE_SEARCH_ERROR,
			errorMessage
		});
	}
};