import React from 'react';

import Base from '../base/view';
import * as _ from './styles';
import types from '../../action-types/login';

const { Btn, Div, Fld, Pwd, Spinner, Txt } = Base.components;

export default class Login extends Base {
	static defaultProps = Base.config.login.defaultProps;

	constructor(props) {
		super(props);

		this.onNickChange = this.onNickChange.bind(this);
		this.onPwdChange = this.onPwdChange.bind(this);
		this.onOkPress = this.onOkPress.bind(this);
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLoginError = this.onLoginError.bind(this);
	}

	render() {
		const { title, nickHolder, pwdHolder, btnText, errorMessage } = this.props;
		const { pending, nick, pwd, error } = this.storeState.login;

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
					<Div style={_.errorContainer}>
						<Txt style={_.error}>{errorMessage}</Txt>
					</Div>
				) : null}
			</Div>
		);
	}

	onNickChange(event) {
		this.runAction(types.SET_LOGIN_NICK, event.nativeEvent.text);
	}

	onPwdChange(event) {
		this.runAction(types.SET_LOGIN_PWD, event.nativeEvent.text);
	}

	onOkPress() {
		const { nick, pwd } = this.storeState.login;
		this.runAction(types.SEND_LOGIN_REQUEST, nick, pwd)
			.then(this.onLoginSuccess)
			.catch(this.onLoginError);
	}

	onLoginSuccess() {
		this.runAction(types.RECEIVE_LOGIN_SUCCESS);
		this.props.onSuccess();
	}

	onLoginError() {
		this.runAction(types.RECEIVE_LOGIN_ERROR);
		this.props.onError();
	}
};