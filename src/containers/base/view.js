import React from 'react';

import routes from '../../app/routes';
import config from '../../app/configs/index';
import * as components from '../../components/index';
import * as containers from '../../containers/index';
import * as services from '../../services/index';

export default class Base extends React.Component {
	static config = config.containers;
	static components = components;

	get services() { return services; }
	get containers() { return containers; }

	navTo(routeId, passProps = null, resetStack = false) {
		const route = routes.find(route => route.id === routeId);
		if (route) {
			const action = resetStack ? 'resetTo' : 'push';
			this.props.navigator[action]({...route, passProps});
		} else {
			throw `Route with ID='${routeId}' doesn't exist.`;
		}
	}
};