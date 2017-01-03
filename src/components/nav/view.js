import React from 'react';
import { Navigator } from 'react-native';

import { Btn, Txt } from '../index';
import * as _ from './styles';

export default class Nav extends React.Component {
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
		return (
			<route.component {...route.passProps} navigator={navigator}/>
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
};