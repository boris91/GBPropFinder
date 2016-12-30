import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Img, Map, Txt } = Base.components;

export default class Search extends Base {
	static defaultProps = Base.config.search.defaultProps;

	constructor(props) {
		super(props);

		this.gps = navigator.geolocation;
		this.onQueryChange = this.onQueryChange.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
		this.onLocationPress = this.onLocationPress.bind(this);
	}

	render() {
		const { title, mapInitialRegion, queryHolder, imageSrc } = this.props;
		const { query, error } = this.storeState.search;

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

	navToResults(criteria) {
		this.runAction(this.types.SET_SEARCH_CRITERIA, criteria);
		this.navTo('search-results');
	}

	isQueryGpsLocation() {
		const gpsPosition = this.storeState.search.query.split(',');
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
		this.runAction(this.types.SET_SEARCH_QUERY, event.nativeEvent.text);
	}

	onGoPress() {
		if (this.isQueryGpsLocation()) {
			this.navToResults(this.props.QueryParam.GPS);
		} else {
			this.navToResults(this.props.QueryParam.PLACE);
		}
	}

	onLocationPress() {
		this.gps.getCurrentPosition(({ coords }) => {
			this.runAction(this.types.SET_SEARCH_QUERY, `${coords.latitude},${coords.longitude}`);
			this.navToResults(this.props.QueryParam.GPS);
		});
	}
};