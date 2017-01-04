import {
	Auth,
	Search,
	SearchResultDetails,
	SearchResults
} from '../containers/index';

export default [{
	id: 'auth',
	title: 'Auth',
	component: Auth,
	passProps: { onSuccess(container) { container.navTo('search', null, true); } }
}, {
	id: 'search',
	title: 'Search',
	component: Search
}, {
	id: 'search-result-details',
	title: 'Property',
	component: SearchResultDetails
}, {
	id: 'search-results',
	title: 'Results',
	component: SearchResults
}];