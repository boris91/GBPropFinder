import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Img, Map, Txt } = Base.components;

export default class Search extends Base {
	static ID = 'search';
	static defaultProps = Base.config.search.defaultProps;

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
		const { title, mapInitialRegion, queryHolder, imageSrc } = this.props;
		const { query, error } = this.state;

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Map style={_.map} initialRegion={mapInitialRegion}/>
				<Div style={_.flowRight}>
					<Fld style={_.queryField} placeholder={queryHolder} value={query} onChange={this.onQueryChange}/>
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
		this.navTo('search-results', { ...this.props, param, query });
	}

	navToResultsByPlace() {
		this.navToResults(this.props.QueryParam.PLACE, this.state.query);
	}

	navToResultsByGps(query = this.state.query) {
		this.navToResults(this.props.QueryParam.GPS, query);
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