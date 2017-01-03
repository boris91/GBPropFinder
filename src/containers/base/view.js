import React from 'react';
import { connect } from 'react-redux';

import routes from '../../app/routes';
import config from '../../app/configs/index';
import * as components from '../../components/index';
import actions from '../../app/actions';
import types from '../../app/types';

export default class Base extends React.Component {
	static config = config.containers;
	static components = components;
	static mapStateToProps(state, ownProps) { return { storeStateContainer: state }; }
	static mapDispatchToProps(dispatch, ownProps) { return { dispatch }; }
	static connect() { return connect(this.mapStateToProps, this.mapDispatchToProps)(this); }

	get storeState() { return this.props.storeStateContainer; }
	get types() { return types; }

	runAction(actionName, ...args) {
		return actions[actionName](this.props.dispatch, ...args);
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