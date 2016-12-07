import React from 'react';
import ReactNative from 'react-native';

export default class mios extends React.Component {
	render() {
		return (
			<ReactNative.View style={styles.container}>
				<ReactNative.Text style={styles.welcome}>
					mios
				</ReactNative.Text>
			</ReactNative.View>
		);
	}
}

const styles = ReactNative.StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});

ReactNative.AppRegistry.registerComponent('mios', () => mios);
