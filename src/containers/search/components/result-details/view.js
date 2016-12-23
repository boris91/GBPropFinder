import React from 'react';

import { Div, Img, Txt } from '../../../../components/all';

import convertResult from './converter';

import * as _ from './styles';

const SearchResultDetails = props => {
	const {
		type, title, uri, summary, price, bedrooms, bathrooms
	} = convertResult(props);

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
};

SearchResultDetails.route = {
	title: 'Authentication',
	component: SearchResultDetails
};

export default SearchResultDetails;