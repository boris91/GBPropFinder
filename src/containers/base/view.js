import React from 'react';

import routes from '../../app/routes';
import config from '../../app/configs/index';
import * as components from '../../components/index';

export default class Base extends React.Component {
	static config = config.containers;
	static components = components;
	get types() { return this.props.actionTypes; }
	get data() { return this.props.storeState; }

	runAction(actionName, ...args) {
		return this.props.actions[actionName](...args);
	}

	navBack() {
		const { navigator } = this.props;
		const { state: { presentedIndex, routeStack } } = navigator;

		if (presentedIndex > routeStack.length - 1) {
			navigator.jumpBack();
		}

		return this;
	}

	navTo(routeId, passProps = null, resetStack = false) {
		const route = routes.find(route => route.id === routeId);
		if (route) {
			const action = resetStack ? 'resetTo' : 'push';
			this.props.navigator[action]({...route, passProps});
		} else {
			throw `Route with ID='${routeId}' doesn't exist.`;
		}
		return this;
	}
};