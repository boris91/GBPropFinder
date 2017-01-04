import {
	Auth,
	Search,
	SearchResultDetails,
	SearchResults
} from '../containers/index';

export const auth = {
	id: 'auth',
	title: 'Auth',
	component: Auth,
	passProps: { onSuccess(container) { container.navTo('search', null, true); } }
};

export const face = {
	id: 'search',
	secure: true,
	title: 'Search',
	component: Search
};

export default [
	auth,
	face, {
		id: 'search-result-details',
		secure: true,
		title: 'Property',
		component: SearchResultDetails
	}, {
		id: 'search-results',
		secure: true,
		title: 'Results',
		component: SearchResults
	}
];