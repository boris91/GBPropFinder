import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Img, Map, Txt } = Base.components;

export default class Search extends Base {
	static defaultProps = Base.config.search.defaultProps;

	constructor(props) {
		super(props);

		this.onMapPress = this.onMapPress.bind(this);
		this.onQueryChange = this.onQueryChange.bind(this);
		this.onSearchByGps = this.onSearchByGps.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
		this.onLocationPress = this.onLocationPress.bind(this);
	}

	render() {
		const { title, mapInitialRegion, queryHolder, imageSrc } = this.props;
		const { query, error } = this.data.search;

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Map style={_.map} initialRegion={mapInitialRegion} onPress={this.onMapPress}/>
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

	onSearchByGps(coords) {
		const { latitude, longitude } = coords;
		this.runAction(this.types.SET_SEARCH_QUERY, `${latitude},${longitude}`);
		this.navTo('search-results');
	}

	onQueryChange(event) {
		this.runAction(this.types.SET_SEARCH_QUERY, event.nativeEvent.text);
	}

	onMapPress(event) {
		this.onSearchByGps(event.nativeEvent.coordinate);
	}

	onGoPress() {
		this.navTo('search-results');
	}

	onLocationPress() {
		navigator.geolocation.getCurrentPosition(this.onSearchByGps);
	}
};