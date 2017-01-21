import React from 'react';

import { Btn, Div, Fld, Img, Txt } from '../../components/index';
import * as _ from './styles';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.onQueryChange = this.onQueryChange.bind(this);
		this.onGoPress = this.onGoPress.bind(this);
	}

	render() {
		const {
			config: { title, queryHolder, imageSrc },
			data: {
				search: { query, error }
			}
		} = this.props;

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Div style={_.flowRight}>
					<Fld style={_.queryField} placeholder={queryHolder} value={query} onChange={this.onQueryChange}/>
					<Btn style={_.button} text="Go" onPress={this.onGoPress}/>
				</Div>
				<Img style={_.houseImage} source={imageSrc}/>
				{error ? <Txt>{error}</Txt> : null}
			</Div>
		);
	}

	onQueryChange(event) {
		this.setSearchQuery(event.nativeEvent.text);
	}

	onGoPress() {
		this.navTo('search-results');
	}
};