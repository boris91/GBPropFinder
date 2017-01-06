import types from './types';
import { Api } from '../../services/index';

export default {
	[types.SET_SEARCH_QUERY]: query => dispatch => {
		dispatch({
			type: types.SET_SEARCH_QUERY,
			query
		});
	},

	[types.RESET_SEARCH_TEMP_DATA]: () => dispatch => {
		dispatch({
			type: types.RESET_SEARCH_TEMP_DATA
		});
	},

	[types.SELECT_SEARCH_RESULT]: selectedResultId => dispatch => {
		dispatch({
			type: types.SELECT_SEARCH_RESULT,
			selectedResultId
		});
	},

	[types.SEND_SEARCH_REQUEST]: (query, page) => dispatch => {
		dispatch({
			type: types.SEND_SEARCH_REQUEST,
			query,
			page
		});
		return Api.search(query, page);
	},

	[types.RECEIVE_SEARCH_SUCCESS]: ({ page, pagesCount, results }) => dispatch => {
		dispatch({
			type: types.RECEIVE_SEARCH_SUCCESS,
			page,
			pagesCount,
			results
		});
	},

	[types.RECEIVE_SEARCH_ERROR]: errorMessage => dispatch => {
		dispatch({
			type: types.RECEIVE_SEARCH_ERROR,
			errorMessage
		});
	}
};