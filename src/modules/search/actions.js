import types from './types';
import { Api } from '../../services/index';

export const setSearchQuery = query => dispatch => {
	dispatch({
		type: types.SET_SEARCH_QUERY,
		query
	});
};

export const selectSearchResult = selectedResultId => dispatch => {
	dispatch({
		type: types.SELECT_SEARCH_RESULT,
		selectedResultId
	});
};

export const sendSearchRequest = page => async (dispatch, getState) => {
	dispatch({
		type: types.SEND_SEARCH_REQUEST,
		page
	});

	const { query, results } = getState().search;
	const resultsByQuery = results[query];
	const resultsList = resultsByQuery && resultsByQuery[page];

	if (resultsList) {
		dispatch(receiveSearchSuccess(page, resultsByQuery.pagesCount, resultsList));
	} else {
		try {
			const response = await Api.search(query, page);
			dispatch(receiveSearchSuccess(page, response.pagesCount, response.results));
		} catch (exc) {
			dispatch(receiveSearchError());
		}
	}

};

const receiveSearchSuccess = (page, pagesCount, results) => ({
	type: types.RECEIVE_SEARCH_SUCCESS,
	page,
	pagesCount,
	results
});

const receiveSearchError = () => ({
	type: types.RECEIVE_SEARCH_ERROR,
	errorMessage: 'Reqeust failed. Try again later.'
});