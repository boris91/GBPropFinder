import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Pwd, Spinner, Txt } = Base.components;

export default class Login extends Base {
	static route = {
		title: 'Login',
		component: Login
	};

	static defaultProps = {
		onSuccess() { console.log('onSuccess'); },
		onError() { console.log('onError'); },

		title: 'Enter your credentials',
		nickHolder: 'Nickname',
		pwdHolder: 'Password',
		btnText: 'Sign in',
		errorMessage: 'Login failed: check your nickname & password for validity.'
	};

	constructor(props) {
		super(props);

		this.state = {
			typing: false,
			pending: false,
			error: false,
			nick: '',
			pwd: ''
		};

		this.onNickChange = this.onNickChange.bind(this);
		this.onPwdChange = this.onPwdChange.bind(this);
		this.onOkPress = this.onOkPress.bind(this);
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onLoginError = this.onLoginError.bind(this);
	}

	render() {
		const { title, nickHolder, pwdHolder, btnText, errorMessage } = this.props;
		const { pending, nick, pwd, error } = this.state;

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Div style={_.row}>
					<Fld style={_.field} editable={!pending} placeholder={nickHolder} value={nick} onChange={this.onNickChange}/>
				</Div>
				<Div style={_.row}>
					<Pwd style={_.field} editable={!pending} placeholder={pwdHolder} value={pwd} onChange={this.onPwdChange}/>
				</Div>
				<Div style={_.row}>
					<Btn style={_.button} disabled={pending} text={btnText} onPress={this.onOkPress}/>
				</Div>
				{pending ? (
					<Spinner style={_.spinner} size="large" color="#909090"/>
				) : (error ? (
					<Div style={_.errorContainer}>
						<Txt style={_.error}>{errorMessage}</Txt>
					</Div>
				) : null)}
			</Div>
		);
	}

	onNickChange(event) {
		this.setState({ typing: true, nick: event.nativeEvent.text });
	}

	onPwdChange(event) {
		this.setState({ typing: true, pwd: event.nativeEvent.text });
	}

	onOkPress() {
		const { nick, pwd } = this.state;
		this.setState({ typing: false, pending: true });

		this.services.Api.login(nick, pwd)
			.then(this.onLoginSuccess)
			.catch(this.onLoginError);
	}

	onLoginSuccess() {
		this.setState({ pending: false, error: false });
		this.props.onSuccess();
	}

	onLoginError() {
		this.setState({ pending: false, error: true });
		this.props.onError();
	}
};