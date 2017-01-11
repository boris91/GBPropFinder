import React from 'react';

import { Btn, Nav, Navbar, Txt } from '../../components/index';
import * as _ from './styles';

export default class Navi extends React.Component {
	constructor(props) {
		super(props);

		this.props.store.subscribe(this.onStoreChange.bind(this));

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
		const navbar = <Navbar style={_.navbar.container} routeMapper={this.navbarRouteMapper}/>;

		return (
			<Nav style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={navbar}/>
		);
	}

	renderScene(route, navigator) {
		const { auth, store, actions } = this.props;
		const sceneProps = { navigator, store, actions };

		return (!route.secure || store.getState().auth.complete) ? (
			<route.component {...route.passProps} {...sceneProps}/>
		) : (
			<auth.component {...sceneProps}/>
		);
	}

	renderNavbarTitle(route, navigator, index, navState) {
		return <Txt style={_.navbar.title}>{route.title}</Txt>;
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