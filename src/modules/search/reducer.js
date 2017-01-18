import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_SEARCH_QUERY:
			return {
				...state,
				query: action.query
			};

		case types.SELECT_SEARCH_RESULT:
			return {
				...state,
				selectedResultId: action.selectedResultId
			};

		case types.SEARCH:
			return {
				...state,
				page: action.page,
				pending: true,
				error: false,
				selectedResultId: ''
			};

		case types.SEARCH_SUCCESS:
			const { page, pagesCount, results } = action;
			return {
				...state,
				pending: false,
				page,
				results: {
					...state.results,
					[state.query]: {
						...state.results[state.query],
						pagesCount,
						[page]: results
					}
				}
			};

		case types.SEARCH_ERROR:
			return {
				...state,
				pending: false,
				error: true
			};

		default:
			return state;
	}
};