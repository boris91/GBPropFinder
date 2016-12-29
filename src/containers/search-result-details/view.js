import React from 'react';

import Base from '../base/view';
import convertResult from '../../modules/search/result-converter';
import * as _ from './styles';

const { Div, Img, Txt } = Base.components;

export default class SearchResultDetails extends Base {
	render() {
		const {
			type, title, uri, summary, price, bedrooms, bathrooms
		} = convertResult(this.storeState.search.selectedResult);

		return (
			<Div style={_.container}>
				<Img style={_.photo} source={{ uri }}/>
				<Div style={_.headInfo}>
					<Txt style={_.price}>{price}</Txt>
					<Txt style={_.title}>{title}</Txt>
				</Div>
				<Txt style={_.attrs}>
					{type}
					{bedrooms}
					{bathrooms}
				</Txt>
				<Div style={_.separator}/>
				<Txt style={_.summary}>{summary}</Txt>
			</Div>
		);
	}
};