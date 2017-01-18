import types from './types';
import { Api } from '../../services/index';

export default {
	setSearchQuery(query) {
		this.dispatch({
			type: types.SET_SEARCH_QUERY,
			query
		});
	},

	selectSearchResult(selectedResultId) {
		this.dispatch({
			type: types.SELECT_SEARCH_RESULT,
			selectedResultId
		});
	},

	async search(page) {
		this.dispatch({
			type: types.SEARCH,
			page
		});

		const { query, results } = this.getState().search;
		const resultsByQuery = results[query];
		const resultsList = resultsByQuery && resultsByQuery[page];

		if (resultsList) {
			this.dispatch(searchSuccess(page, resultsByQuery.pagesCount, resultsList));
		} else {
			try {
				const response = await Api.search(query, page);
				this.dispatch(searchSuccess(page, response.pagesCount, response.results));
			} catch (exc) {
				this.dispatch(searchError());
			}
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
	type: types.SEARCH_ERROR
});