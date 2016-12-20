import React from 'react';
import {
	TouchableHighlight,
	Text
} from 'react-native';

import {
	_touchableHighlight_,
	_text_
} from './styles';

/**
 *
 * @param props = { color, backgroundColor, style, text, disabled, onPress }
 * @returns {XML}
 */
export default (props = {}) => {
	const { style, color, text, disabled, onPress } = props;
	const thDisabled = 'boolean' === typeof disabled ? disabled : false;
	const _touchableHighlightStyle_ = {
		..._touchableHighlight_,
		...style
	};
	const _textStyle_ = {
		..._text_,
		color: (style && style.color) || color || _text_.color
	};
	return (
		<TouchableHighlight disabled={thDisabled} style={_touchableHighlightStyle_} onPress={onPress}>
			<Text style={_textStyle_}>{text || ''}</Text>
		</TouchableHighlight>
	);
};