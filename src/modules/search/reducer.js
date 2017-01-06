import types from './types';
import initialState from './initial-state';

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_SEARCH_QUERY:
			return {
				...state,
				query: action.query
			};

		case types.RESET_SEARCH_TEMP_DATA:
			return {
				...state,
				error: initialState.error,
				errorMessage: initialState.errorMessage,
				page: initialState.page
			};

		case types.SELECT_SEARCH_RESULT:
			return {
				...state,
				selectedResultId: action.selectedResultId
			};

		case types.SEND_SEARCH_REQUEST:
			return {
				...state,
				page: action.page,
				pending: true,
				error: false,
				errorMessage: '',
				selectedResultId: ''
			};

		case types.RECEIVE_SEARCH_SUCCESS:
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