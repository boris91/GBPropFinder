import React from 'react';
import Search from './containers/search/view';

export const routes = [{
	index: 0,
	title: 'Property seeker',
	component: Search
}];

export const renderScene = (route, navigator) => {
	return <route.component {...route.passProps} navigator={navigator}/>;
};