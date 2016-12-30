import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_SEARCH_CRITERIA:
			return {
				...state,
				criteria: action.criteria
			};

		case types.SET_SEARCH_QUERY:
			return {
				...state,
				query: action.query
			};

		case types.SET_SEARCH_RESULTS_PAGE:
			return {
				...state,
				page: action.page
			};

		case types.SELECT_SEARCH_RESULT:
			return {
				...state,
				selectedResult: action.selectedResult
			};

		case types.SEND_SEARCH_REQUEST:
			return {
				...state,
				pending: true,
				error: false,
				errorMessage: '',
				resultsCount: 0,
				results: null,
				selectedResult: null
			};

		case types.RECEIVE_SEARCH_SUCCESS:
			const { pagesCount, resultsCount, results } = action;
			return {
				...state,
				pending: false,
				pagesCount,
				resultsCount,
				results
			};

		case types.RECEIVE_SEARCH_ERROR:
			return {
				...state,
				pending: false,
				error: true,
				errorMessage: action.errorMessage
			};

		default:
			return state;
	}
};