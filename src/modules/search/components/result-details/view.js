import React from 'react';

import {
	List,
	TouchLight,
	View,
	Spinner,
	Image,
	Text
} from '../../../../components/all';

import convertResult from './converter';

import {
	_container_,
	_photo_,
	_headInfo_,
	_title_,
	_price_,
	_attrs_,
	_separator_,
	_summary_
} from './styles';

export default SearchResultDetailsView = props => {
	const {
		type, title, uri, summary, price, bedrooms, bathrooms
	} = convertResult(props);

	return (
		<View style={_container_}>
			<Image style={_photo_} source={{ uri }}/>
			<View style={_headInfo_}>
				<Text style={_price_}>{price}</Text>
				<Text style={_title_}>{title}</Text>
			</View>
			<Text style={_attrs_}>
				{type}
				{bedrooms}
				{bathrooms}
			</Text>
			<View style={_separator_}/>
			<Text style={_summary_}>{summary}</Text>
		</View>
	);
};