import React from 'react';
import { connect } from 'react-redux';
import { Navigator } from 'react-native';

import { Btn, Txt } from '../index';
import * as _ from './styles';

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.renderScene = this.renderScene.bind(this);
	}

	get navbar() {
		return (
			<Navigator.NavigationBar style={_.navbar} routeMapper={this.navbarRouteMapper}/>
		);
	}

	get navbarRouteMapper() {
		return {
			Title: this.renderNavbarTitle,
			LeftButton: this.renderNavbarLeftButton,
			RightButton: this.renderNavbarRightButton
		};
	}

	render() {
		const { face } = this.props;
		return (
			<Navigator style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={this.navbar}/>
		);
	}

	renderScene(route, navigator) {
		const { auth, storeState, dispatch } = this.props;
		const sceneProps = { navigator, storeState, dispatch };

		return (!route.secure || storeState.auth.complete) ? (
			<route.component {...route.passProps} {...sceneProps}/>
		) : (
			<auth.component {...sceneProps} onSuccess={this.getAuthSuccessHandler(route)}/>
		);
	}

	getAuthSuccessHandler(route, sceneProps) {
		return container => {
			container
				.navBack()
				.navTo(route.id, { ...route.passProps, ...sceneProps });
		};
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
};

export default connect(state => ({ storeState: state }), dispatch => ({ dispatch }))(Nav);