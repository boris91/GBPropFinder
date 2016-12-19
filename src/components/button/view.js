import React from 'react';
import {
	TouchableHighlight,
	Text
} from 'react-native';

import {
	touchableHighlight,
	text
} from './styles';

/**
 *
 * @param props = { color, backgroundColor, style, text, onPress }
 * @returns {XML}
 */
export default (props = {}) => {
	const touchableHighlightStyle = {
		...touchableHighlight,
		...props.style
	};
	const textStyle = {
		...text,
		color: (props.style && props.style.color) || props.color || text.color
	};
	return (
		<TouchableHighlight style={touchableHighlightStyle} onPress={props.onPress}>
			<Text style={textStyle}>{props.text || ''}</Text>
		</TouchableHighlight>
	);
};