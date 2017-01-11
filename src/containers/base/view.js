import React from 'react';

import routes from '../../app/routes';
import config from '../../app/configs/index';
import * as components from '../../components/index';

export default class Base extends React.Component {
	static config = config.containers;
	static components = components;
	static actionsAssignedToBaseProto = false;
	get data() { return this.props.store.getState(); }

	constructor(props) {
		super(props);
		if (!Base.actionsAssignedToBaseProto) {
			Object.assign(Base.prototype, props.actions);
			Base.actionsAssignedToBaseProto = true;
		}
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