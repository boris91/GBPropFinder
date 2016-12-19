import React from 'react';

import {
	View,
	Text,
	TextInput,
	Image,
	Button
} from '../../components/all';

import {
	container,
	description,
	flowRight,
	searchInput,
	houseImage
} from './styles';

export default class SearchView extends React.Component {
	render() {
		return (
			<View style={container}>
				<Text style={description}>
					Search for houses to buy!
				</Text>
				<Text style={description}>
					Search by place name, postcode or nearby location.
				</Text>
				<View style={flowRight}>
					<TextInput style={searchInput} placeholder="Name/postcode"/>
					<Button text="Go"/>
				</View>
				<View style={flowRight}>
					<Button text="Location"/>
				</View>
				<Image source={require('./images/house.png')} style={houseImage}/>
			</View>
		);
	}
};