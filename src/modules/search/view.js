import React from 'react';

import { Btn, Div, Img, Input, Txt } from '../../components/all';

import SearchResults from './components/results/view';

import * as _ from './styles';

const Param = {
	PLACE: 'place_name',
	GPS: 'centre_point'
};

export default class Search extends React.Component {
	static defaultProps = {
		title: 'Search for houses to buy!',
		description: 'Seek by place name, post code or current location.',
		queryPlaceholder: 'Place/postcode',
		imageSrc: require('./images/house.png'),
		apiUrl: 'http://api.nestoria.co.uk/api?encoding=json&action=search_listings',
		invalidQueryMessage: 'Query\'s invalid. Please, enter the correct one.',
		invalidGpsLocation: 'GPS location couldn\'t be obtained properly. Try again later.',
		requestFailMessage: 'Reqeust failed. Try again later.',
		noDataMessage: 'No data provided. Try again later.'
	};

	constructor(props) {
		super(props);

		this.state = {
			query: ''
		};

		this.gps = navigator.geolocation;
		this.onQueryChange = this.onQueryChange.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
		this.onLocationPress = this.onLocationPress.bind(this);
	}

	render() {
		const { title, description, queryPlaceholder, imageSrc } = this.props;
		const { query, error } = this.state;

		return (
			<Div style={_.container}>
				<Txt style={_.description}>{title}</Txt>
				<Txt style={_.description}>{description}</Txt>
				<Div style={_.flowRight}>
					<Input style={_.searchInput} placeholder={queryPlaceholder} value={query} onChange={this.onQueryChange}/>
					<Btn style={_.button} text="Go" onPress={this.onGoPress}/>
				</Div>
				<Div style={_.flowRight}>
					<Btn style={_.button} text="Location" onPress={this.onLocationPress}/>
				</Div>
				<Img style={_.houseImage} source={imageSrc}/>
				{error ? <Txt>{error}</Txt> : null}
			</Div>
		);
	}

	navToResults(param, query) {
		this.props.navigator.push({
			title: 'Results',
			component: SearchResults,
			passProps: {
				...this.props,
				param,
				query
			}
		});
	}

	navToResultsByPlace() {
		this.navToResults(Param.PLACE, this.state.query);
	}

	navToResultsByGps(query = this.state.query) {
		this.navToResults(Param.GPS, query);
	}

	isQueryGpsLocation() {
		const gpsPosition = this.state.query.split(',');
		if (2 === gpsPosition.length) {
			let latitude = parseFloat(gpsPosition[0]);
			let longitude = parseFloat(gpsPosition[1]);
			if (!isNaN(latitude) && !isNaN(longitude)) {
				return true;
			}
		}
		return false;
	}

	onQueryChange(event) {
		this.setState({ query: event.nativeEvent.text });
	}

	onGoPress() {
		if (this.isQueryGpsLocation()) {
			this.navToResultsByGps();
		} else {
			this.navToResultsByPlace();
		}
	}

	onLocationPress() {
		this.gps.getCurrentPosition(
			position => {
				const query = `${position.coords.latitude},${position.coords.longitude}`;
				this.navToResultsByGps(query);
			},
			error => this.setState({ error: this.props.invalidGpsLocation })
		);
	}
};