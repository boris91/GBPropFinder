import React from 'react';

import { Btn, Div, Fld, Pwd, Spinner, Txt } from '../../components/index';

import * as _ from './styles';

export default class Login extends React.Component {
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
		this.setState({ typing: false, pending: true });

		//TODO: remove this code when API is ready
		setTimeout(() => {
			const { nick, pwd } = this.state;
			this['admin' === nick && 'admin' === pwd ? 'onSuccess' : 'onError']();
		}, 1000);
	}

	onSuccess() {
		this.setState({ pending: false, error: false });
		this.props.onSuccess();
	}

	onError() {
		this.setState({ pending: false, error: true });
		this.props.onError();
	}
};