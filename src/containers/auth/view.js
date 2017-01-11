import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Pwd, Spinner, Txt } = Base.components;

export default class Auth extends Base {
	static defaultProps = Base.config.auth.defaultProps;

	constructor(props) {
		super(props);

		this.onNickChange = this.onNickChange.bind(this);
		this.onPwdChange = this.onPwdChange.bind(this);
		this.onOkPress = this.onOkPress.bind(this);
	}

	render() {
		const { title, nickHolder, pwdHolder, btnText, errorMessage } = this.props;
		const { pending, nick, pwd, error } = this.data.auth;

		if (pending) {
			return (
				<Div style={_.container}>
					<Spinner style={_.spinner} size="large" color="#909090"/>
				</Div>
			);
		}

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Div style={_.row}>
					<Fld style={_.field} placeholder={nickHolder} value={nick} onChange={this.onNickChange}/>
				</Div>
				<Div style={_.row}>
					<Pwd style={_.field} placeholder={pwdHolder} value={pwd} onChange={this.onPwdChange}/>
				</Div>
				<Div style={_.row}>
					<Btn style={_.button} disabled={!nick || !pwd} text={btnText} onPress={this.onOkPress}/>
				</Div>
				{error ? (
					<Div style={_.error.container}>
						<Txt style={_.error.text}>{errorMessage}</Txt>
					</Div>
				) : null}
			</Div>
		);
	}

	onNickChange(event) {
		this.setAuthNick(event.nativeEvent.text);
	}

	onPwdChange(event) {
		this.setAuthPwd(event.nativeEvent.text);
	}

	onOkPress() {
		this.sendAuthRequest(this.props.onSuccess, this.props.onError);
	}
};