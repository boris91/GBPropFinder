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

export const search = page => async (dispatch, getState) => {
	dispatch({
		type: types.SEARCH,
		page
	});

	const { query, results } = getState().search;
	const resultsByQuery = results[query];
	const resultsList = resultsByQuery && resultsByQuery[page];

	if (resultsList) {
		dispatch(searchSuccess(page, resultsByQuery.pagesCount, resultsList));
	} else {
		try {
			const response = await Api.search(query, page);
			dispatch(searchSuccess(page, response.pagesCount, response.results));
		} catch (exc) {
			dispatch(searchError());
		}
	}

};

const searchSuccess = (page, pagesCount, results) => ({
	type: types.SEARCH_SUCCESS,
	page,
	pagesCount,
	results
});

const searchError = () => ({
	type: types.SEARCH_ERROR,
	errorMessage: 'Reqeust failed. Try again later.'
});