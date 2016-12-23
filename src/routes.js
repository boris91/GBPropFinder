import React from 'react';
import {
	Auth,
	Search
} from './containers/all';

export const routes = [{
	index: 0,
	title: 'Authentication',
	component: Auth
}, {
	index: 1,
	title: 'Search property',
	component: Search
}];

export const renderScene = (route, navigator) => {
	return <route.component {...route.passProps} navigator={navigator}/>;
};