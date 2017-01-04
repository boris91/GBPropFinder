import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Div, Img, Txt } = Base.components;

export default class SearchResultDetails extends Base {
	render() {
		const { results, selectedResultId } = this.data.search;
		const { title, uri, summary, price, attrs } = results.find(result => result.id === selectedResultId);

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