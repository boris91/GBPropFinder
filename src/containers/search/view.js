import React from 'react';

import { Btn, Div, Fld, Img, Map, Txt } from '../../components/index';
import * as _ from './styles';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.onMapPress = this.onMapPress.bind(this);
		this.onQueryChange = this.onQueryChange.bind(this);
		this.onSearchByGps = this.onSearchByGps.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
		this.onLocationPress = this.onLocationPress.bind(this);
	}

	render() {
		const {
			config: { title, mapInitialRegion, queryHolder, imageSrc },
			data: {
				search: { query, error }
			}
		} = this.props;

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

	async onSearchByGps(location) {
		const { coords: { latitude, longitude } } = location;
		await this.setSearchQuery(`${latitude},${longitude}`);
		this.navTo('search-results');
	}

	onQueryChange(event) {
		this.setSearchQuery(event.nativeEvent.text);
	}

	onMapPress(event) {
		this.onSearchByGps({ coords: event.nativeEvent.coordinate });
	}

	onGoPress() {
		this.navTo('search-results');
	}

	onLocationPress() {
		navigator.geolocation.getCurrentPosition(this.onSearchByGps);
	}
};