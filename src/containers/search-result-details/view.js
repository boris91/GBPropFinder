import React from 'react';

import Base from '../base/view';
import convertResult from '../../modules/search/result-converter';
import * as _ from './styles';

const { Div, Img, Txt } = Base.components;

export default class SearchResultDetails extends Base {
	render() {
		const {
			title, uri, summary, price, attrs
		} = convertResult(this.storeState.search.selectedResult);

		return (
			<Div style={_.container}>
				<Img style={_.photo} source={{ uri }}/>
				<Div style={_.headInfo}>
					<Txt style={_.price}>{price}</Txt>
					<Txt style={_.title}>{title}</Txt>
				</Div>
				<Txt style={_.attrs}>{attrs}</Txt>
				<Div style={_.separator}/>
				<Txt style={_.summary}>{summary}</Txt>
			</Div>
		);
	}
};