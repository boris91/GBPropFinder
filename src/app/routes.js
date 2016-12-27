import React from 'react';

import * as containers from '../containers/index';

const { Auth, Login, Search, SearchResultDetails, SearchResults } = containers;

export default [{
	id: 'auth',
	title: 'Authentication',
	component: Auth
}, {
	id: 'login',
	title: 'Login',
	component: Login
}, {
	id: 'search',
	title: 'Property search',
	component: Search
}, {
	id: 'search-result-details',
	title: 'Search result details',
	component: SearchResultDetails
}, {
	id: 'search-results',
	title: 'Search results',
	component: SearchResults
}];