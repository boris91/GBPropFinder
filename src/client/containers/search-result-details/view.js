import React from 'react';

import { Div, Img, Txt } from '../../components/index';
import * as _ from './styles';

export default class SearchResultDetails extends React.Component {
	render() {
		const {
			data: { search: { query, page, results, selectedResultId } }
		} = this.props;
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