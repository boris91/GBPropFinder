import React from 'react';
import { Navigator } from 'react-native';

import { Btn, Txt } from '../index';
import * as _ from './styles';

export default props => (
	<Navigator style={_.navigator} initialRoute={props.face} renderScene={renderScene} navigationBar={getNavbar()}/>
);

const renderScene = (route, navigator) => <route.component {...route.passProps} navigator={navigator}/>;

const getNavbar = () => <Navigator.NavigationBar style={_.navbar} routeMapper={navbarRouteMapper}/>;

const navbarRouteMapper = {
	Title(route, navigator, index, navState) {
		return <Txt style={_.navbarTitle}>{route.title}</Txt>;
	},

	LeftButton(route, navigator, index, navState) {
		if (0 === index) {
			return null;
		} else {
			const text = `< ${navState.routeStack[index - 1].title}`;
			return (
				<Btn style={_.navbarButton} text={text} underlayColor="transparent" onPress={() => navigator.pop()}/>
			);
		}
	},

	RightButton(route, navigator, index, navState) {
		return null;
	}
};