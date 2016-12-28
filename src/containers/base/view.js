import React from 'react';
import { connect } from 'react-redux';

import routes from '../../app/routes';
import config from '../../app/configs/index';
import * as components from '../../components/index';
import * as actions from '../../actions/index';
import * as services from '../../services/index';

export default class Base extends React.Component {
	static ID = 'base';
	static config = config.containers;
	static components = components;
	static mapStateToProps(state, ownProps) { return {}; }
	static mapDispatchToProps(dispatch, ownProps) { return { dispatch }; }
	static connect() { return connect(this.mapStateToProps, this.mapDispatchToProps)(this); }

	get services() { return services; }

	runAction(actionName, ...args) {
		let action = actions[this.constructor.ID][actionName](...args);
		let result;

		if (Array.isArray(action)) {
			[action, result] = action;
		}

		this.props.dispatch(action);
		return result;
	}

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