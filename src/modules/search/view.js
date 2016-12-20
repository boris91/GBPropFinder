import React from 'react';

import {
	Spinner,
	View,
	Text,
	TextInput,
	Image,
	Button
} from '../../components/all';

import SearchResultsView from './components/results/view';

import {
	_container_,
	_description_,
	_flowRight_,
	_searchInput_,
	_houseImage_
} from './styles';

export default class SearchView extends React.Component {
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
			query: '',
			pending: false,
			error: '',
			data: null
		};

		this.onDataFetchSucceed = this.onDataFetchSucceed.bind(this);
		this.onDataFetchFailed = this.onDataFetchFailed.bind(this);
		this.onQueryChange = this.onQueryChange.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
		this.onLocationPress = this.onLocationPress.bind(this);
	}

	render() {
		const { title, description, queryPlaceholder, imageSrc } = this.props;
		const { query, pending } = this.state;
		const goButtonDisabled = pending || !query;

		return (
			<View style={_container_}>
				<Text style={_description_}>{title}</Text>
				<Text style={_description_}>{description}</Text>
				<View style={_flowRight_}>
					<TextInput style={_searchInput_} placeholder={queryPlaceholder} value={query} onChange={this.onQueryChange}/>
					<Button text="Go" disabled={goButtonDisabled} onPress={this.onGoPress}/>
				</View>
				<View style={_flowRight_}>
					<Button text="Location" disabled={pending} onPress={this.onLocationPress}/>
				</View>
				<Image style={_houseImage_} source={imageSrc}/>
				<View>
					{this.renderFetchedData()}
				</View>
			</View>
		);
	}

	renderFetchedData() {
		const { pending, error, data } = this.state;
		//console.log(this.state);

		if (pending) {
			return <Spinner size="large" color="#909090"/>;
		} else if (error) {
			return <Text>{error}</Text>;
		} else if (data && 0 < data.resultsCount) {
			this.props.navigator.push({
				title: 'Results',
				component: SearchResultsView,
				passProps: data
			});
		};

		return null;
	}

	fetchByPlaceName(page) {
		this.fetchData('place_name', this.state.query, page);
	}

	fetchByGpsLocation(page) {
		navigator.geolocation.getCurrentPosition(
			gpsPosition => this.fetchByGpsPosition(gpsPosition, page),
			error => this.setState({ error: this.props.invalidGpsLocation })
		);
	}

	fetchByGpsPosition(gpsPosition, page) {
		const { coords: { latitude, longitude } } = gpsPosition;
		const query = `${latitude},${longitude}`;
		this.setState({ query });
		this.fetchData('centre_point', query, page);
	}

	fetchData(key, value, page = 1) {
		const url = `${this.props.apiUrl}&${key}=${encodeURIComponent(value)}&page=${page}`;
		//console.log(url);
		return fetch(url)
			.then(response => response.json())
			.then(({request, response}) => this.onDataFetchSucceed(response))
			.catch(this.onDataFetchFailed);
	}

	convertQueryToGpsPosition() {
		const gpsPosition = this.state.query.split(',');
		if (2 === gpsPosition.length) {
			let latitude = parseFloat(gpsPosition[0]);
			let longitude = parseFloat(gpsPosition[1]);
			if (!isNaN(latitude) && !isNaN(longitude)) {
				return { coords: { latitude, longitude } };
			}
		}
		return null;
	}

	onDataFetchSucceed(response) {
		const { application_response_code, total_pages, page, total_results, listings } = response;
		let error = this.props.invalidQueryMessage;
		let data = null;

		if ('1' === application_response_code.substr(0, 1)) {
			error = '';
			data = {
				pagesCount: total_pages + 1,
				page,
				resultsCount: total_results,
				results: listings
			};
		}

		this.setState({ pending: false, error, data });
	}

	onDataFetchFailed(error) {
		this.setState({
			pending: false,
			data: null,
			error: this.props.requestFailMessage
		});
	}

	onQueryChange(event) {
		this.setState({ query: event.nativeEvent.text });
	}

	onGoPress() {
		this.setState({ pending: true });
		const gpsPosition = this.convertQueryToGpsPosition();
		if (gpsPosition) {
			this.fetchByGpsPosition(gpsPosition);
		} else {
			this.fetchByPlaceName();
		}
	}

	onLocationPress() {
		this.setState({ pending: true });
		this.fetchByGpsLocation();
	}
};