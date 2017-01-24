import React from 'react';

import { Btn, Menu, Nav, Navbar, Txt } from '../../components/index';
import * as _ from './styles';

export default class Navi extends React.Component {
	constructor(props) {
		super(props);

		this.props.store.subscribe(this.forceUpdate.bind(this));
		const boundActions = Object.keys(this.props.actions).reduce((actions, actionName) => {
			actions[actionName] = this.runAction.bind(this, actionName);
			return actions;
		}, {
			navTo: this.navTo.bind(this),
			navBack: this.navBack.bind(this)
		});
		this.props.routes.forEach(route => Object.assign(route.component.prototype, boundActions));

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

	componentDidUpdate(prevProps, prevState) {
		this.actionRunning = false;
		if (this.actionResolve) {
			this.actionResolve();
			this.actionResolve = null;
		}
	}

	render() {
		const { face, menuItems } = this.props;
		const navbar = <Navbar style={_.navbar.container} routeMapper={this.navbarRouteMapper}/>;

		return (
			<Menu items={menuItems}>
				<Nav style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={navbar}/>
			</Menu>
		);
	}

	renderScene(route, navigator) {
		const { auth, store, configs } = this.props;
		this.navigator = navigator;
		const scene = this.isRouteAccessible(route) ? route : auth;
		return (
			<scene.component config={configs[scene.id]} data={store.getState()} {...scene.passProps}/>
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
				<Btn style={_.navbar.button} text={text} underlayColor="transparent" onPress={() => navigator.pop()}/>
			);
		}
	}

	renderNavbarRightButton(route, navigator, index, navState) {
		return null;
	}

	isRouteAccessible(route) {
		return !route.secure || this.props.store.getState().auth.complete;
	}

	navTo(routeId, passProps = null) {
		const route = this.props.routes.find(route => route.id === routeId);
		this.navigator.push({ ...route, passProps });
	}

	navBack() {
		const { state: { presentedIndex, routeStack } } = this.navigator;
		if (presentedIndex > routeStack.length - 1) {
			this.navigator.jumpBack();
		}
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