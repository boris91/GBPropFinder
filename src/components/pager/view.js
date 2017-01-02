import { Btn, Div, React, Txt } from '../index';

import * as _ from './styles';

export default class Pager extends React.Component {
	render() {
		const { style, btnStyle, lblStyle, current, count, disabled, onPrevPress, onNextPress } = this.props;

		const _container = { ..._.container, ...style };
		const _button = { ..._.button, ...btnStyle };
		const _label = { ..._.label, ...lblStyle };

		const prevBtnDisabled = disabled || current <= 1;
		const nextBtnDisabled = disabled || current === count;
		const labelText = current <= count ? `${current}/${count}` : '...';

		return (
			<Div style={_container}>
				<Btn style={_button} text="<" disabled={prevBtnDisabled} onPress={onPrevPress}/>
				<Txt style={_label}>{labelText}</Txt>
				<Btn style={_button} text=">" disabled={nextBtnDisabled} onPress={onNextPress}/>
			</Div>
		);
	}
};