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

	[types.SET_SEARCH_RESULTS_PAGE](dispatch, page) {
		dispatch({
			type: types.SET_SEARCH_RESULTS_PAGE,
			page
		});
	},

	[types.SELECT_SEARCH_RESULT](dispatch, selectedResultId) {
		dispatch({
			type: types.SELECT_SEARCH_RESULT,
			selectedResultId
		});
	},

	[types.SEND_SEARCH_REQUEST](dispatch, criteria, query, page) {
		dispatch({
			type: types.SEND_SEARCH_REQUEST,
			criteria,
			query,
			page
		});
		return Api.search(criteria, query, page);
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