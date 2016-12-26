import React from 'react';
import {
	Auth,
	Login,
	Search,
	SearchResults,
	SearchResultDetails
} from './containers/index';

export const routes = [
	Auth.route,
	Login.route,
	Search.route,
	SearchResults.route,
	SearchResultDetails.route
];

export const renderScene = (route, navigator) => (
	<route.component {...route.passProps} navigator={navigator}/>
);