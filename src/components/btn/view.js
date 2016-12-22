import React from 'react';
import { Touch, Txt } from '../all';

import * as _ from './styles';

export default class Btn extends React.Component {
	render() {
		const { style, text, ...restProps } = this.props;
		const _touch = { ..._.touch, ...style };
		delete _touch.color;
		const _text = { ..._.text, color: style && style.color || _.text.color };

		return (
			<Touch style={_touch} {...restProps}>
				<Txt style={_text}>{text || ''}</Txt>
			</Touch>
		);
	}
};