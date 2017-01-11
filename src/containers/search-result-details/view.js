import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Div, Img, Txt } = Base.components;

export default class SearchResultDetails extends Base {
	render() {
		const { query, page, results, selectedResultId } = this.data.search;
		const { title, uri, summary, price, attrs } = results[query][page].find(result => result.id === selectedResultId);

		return (
			<Div style={_.container}>
				<Img style={_.photo} source={{ uri }}/>
				<Div style={_.headInfo.container}>
					<Txt style={_.headInfo.price}>{price}</Txt>
					<Txt style={_.headInfo.title}>{title}</Txt>
				</Div>
				<Txt style={_.attrs}>{attrs}</Txt>
				<Div style={_.separator}/>
				<Txt style={_.summary}>{summary}</Txt>
			</Div>
		);
	}
};