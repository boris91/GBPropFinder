import React from 'react';
import {
	View,
	Text
} from 'react-native';

import {
	container,
	text
} from './styles';

export default class HomeView extends React.Component {
	render() {
		return (
			<View style={container}>
				<Text style={text}>
					{new Date().toLocaleTimeString()}
				</Text>
			</View>
		);
	}
};