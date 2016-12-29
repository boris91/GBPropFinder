import types from './types';
import { Api } from '../../services/index';

export default {
	[types.SET_SEARCH_CRITERIA](dispatch, criteria) {
		dispatch({
			type: types.SET_SEARCH_CRITERIA,
			criteria
		});
	},

	[types.SET_SEARCH_QUERY](dispatch, query) {
		dispatch({
			type: types.SET_SEARCH_QUERY,
			query
		});
	},

	[types.SELECT_SEARCH_RESULT](dispatch, selectedResult) {
		dispatch({
			type: types.SELECT_SEARCH_RESULT,
			selectedResult
		});
	},

	[types.SEND_SEARCH_REQUEST](dispatch, criteria, query) {
		dispatch({
			type: types.SEND_SEARCH_REQUEST,
			criteria,
			query
		});
		return Api.search(criteria, query);
	},

	[types.RECEIVE_SEARCH_SUCCESS](dispatch, { page, pagesCount, resultsCount, results }) {
		dispatch({
			type: types.RECEIVE_SEARCH_SUCCESS,
			page,
			pagesCount,
			resultsCount,
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