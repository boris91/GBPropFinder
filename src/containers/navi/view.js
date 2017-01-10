import React from 'react';
import { bindActionCreators } from 'redux';

import actions from '../../app/actions';
import { Btn, Nav, Navbar, Txt } from '../../components/index';
import * as _ from './styles';

export default class Navi extends React.Component {
	constructor(props) {
		super(props);

		const { store } = this.props;
		this.actions = bindActionCreators(actions, store.dispatch.bind(store));
		store.subscribe(this.onStoreChange.bind(this));

		this.updating = false;
		this.nextUpdUpcoming = false;
		this.updPromise = null;
		this.updResolve = null;

		this.renderScene = this.renderScene.bind(this);
		this.navbarRouteMapper = {
			Title: this.renderNavbarTitle.bind(this),
			LeftButton: this.renderNavbarLeftButton.bind(this),
			RightButton: this.renderNavbarRightButton.bind(this)
		};
	}

	componentDidUpdate(prevProps, prevState) {
		this.updating = false;
		if (this.updResolve) {
			this.updResolve();
		}
	}

	render() {
		const { face } = this.props;
		const navbar = <Navbar style={_.navbar} routeMapper={this.navbarRouteMapper}/>;

		return (
			<Nav style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={navbar}/>
		);
	}

	renderScene(route, navigator) {
		const { auth, store } = this.props;
		const storeState = store.getState();
		const sceneProps = { navigator, storeState, actions: this.actions };

		return (!route.secure || storeState.auth.complete) ? (
			<route.component {...route.passProps} {...sceneProps}/>
		) : (
			<auth.component {...sceneProps}/>
		);
	}

	renderNavbarTitle(route, navigator, index, navState) {
		return <Txt style={_.navbarTitle}>{route.title}</Txt>;
	}

	renderNavbarLeftButton(route, navigator, index, navState) {
		if (0 === index) {
			return null;
		} else {
			const text = `< ${navState.routeStack[index - 1].title}`;
			return (
				<Btn style={_.navbarButton} text={text} underlayColor="transparent"
				     onPress={() => navigator.pop()}/>
			);
		}
	}

	renderNavbarRightButton(route, navigator, index, navState) {
		return null;
	}

	update() {
		this.updating = true;
		this.updPromise = new Promise(res => this.updResolve = res);
		this.forceUpdate();
	}

	async onStoreChange() {
		if (!this.updating) {
			this.update();
		} else if (!this.nextUpdUpcoming) {
			this.nextUpdUpcoming = true;
			await this.updPromise;
			this.nextUpdUpcoming = false;
			this.update();
		}
	}
};