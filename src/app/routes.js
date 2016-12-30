import React from 'react';

import * as containers from '../containers/index';

const { Auth, Login, Search, SearchResultDetails, SearchResults } = containers;

export default [{
	id: 'auth',
	title: 'Auth',
	component: Auth
}, {
	id: 'login',
	title: 'Login',
	component: Login
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