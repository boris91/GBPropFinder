import React from 'react';

import { Btn, Nav, Navbar, Txt } from '../../components/index';
import * as _ from './styles';

export default class Navi extends React.Component {
	constructor(props) {
		super(props);

		this.props.store.subscribe(this.forceUpdate.bind(this));
		this.boundActions = Object.keys(this.props.actions).reduce((boundActions, actionName) => {
			boundActions[actionName] = this.runAction.bind(this, actionName);
			return boundActions;
		}, {});

		this.actionRunning = false;
		this.actionPromise = Promise.resolve();
		this.actionResolve = null;

		this.renderScene = this.renderScene.bind(this);
		this.navbarRouteMapper = {
			Title: this.renderNavbarTitle.bind(this),
			LeftButton: this.renderNavbarLeftButton.bind(this),
			RightButton: this.renderNavbarRightButton.bind(this)
		};
	}

	isRouteAccessible(route) {
		return !route.secure || this.props.store.getState().auth.complete;
	}

	componentDidUpdate(prevProps, prevState) {
		this.actionRunning = false;
		if (this.actionResolve) {
			this.actionResolve();
			this.actionResolve = null;
		}
	}

	render() {
		const { face } = this.props;
		const navbar = <Navbar style={_.navbar.container} routeMapper={this.navbarRouteMapper}/>;

		return (
			<Nav style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={navbar}/>
		);
	}

	renderScene(route, navigator) {
		const { auth, store } = this.props;
		const sceneProps = { navigator, store, actions: this.boundActions };

		return this.isRouteAccessible(route) ? (
			<route.component {...route.passProps} {...sceneProps}/>
		) : (
			<auth.component {...sceneProps}/>
		);
	}

	renderNavbarTitle(route, navigator, index, navState) {
		return (
			<Txt style={_.navbar.title}>
				{this.isRouteAccessible(route) ? route.title : this.props.auth.title}
			</Txt>
		);
	}

	renderNavbarLeftButton(route, navigator, index, navState) {
		if (0 === index) {
			return null;
		} else {
			const text = `< ${navState.routeStack[index - 1].title}`;
			return (
				<Btn style={_.navbar.button} text={text} underlayColor="transparent"
				     onPress={() => navigator.pop()}/>
			);
		}
	}

	renderNavbarRightButton(route, navigator, index, navState) {
		return null;
	}

	async runAction(actionName, ...args) {
		await this.actionPromise;
		return this.actionPromise = new Promise((resolve, reject) => {
			this.actionRunning = true;
			this.actionResolve = resolve;
			this.props.actions[actionName].apply(this.props.store, args);
		});
	}
};