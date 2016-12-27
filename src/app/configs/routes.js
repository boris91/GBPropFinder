import React from 'react';
import * as containers from '../../containers/index';

export const routes = Object.keys(containers).reduce((routes, key) => {
	const component = containers[key];
	const routeData = component.route;
	if (routeData) {
		const { id, title } = routeData;
		routes.push({ id, title, component });
	}
	return routes;
}, []);

export const initialRoute = routes.find(route => route.id === 'auth');

export default routes;