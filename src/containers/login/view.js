import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Btn, Div, Fld, Pwd, Spinner, Txt } = Base.components;

export default class Login extends Base {
	static ID = 'login';
	static defaultProps = {
		...Base.config.login.defaultProps,
		onSuccess() { console.log('onSuccess'); },
		onError() { console.log('onError'); }
	};
	static mapStateToProps(state, ownProps) { return state.login; }

	constructor(props) {
		super(props);

		const { pending, nick, pwd, error } = this.props;
		this.state = { pending, nick, pwd, error };

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
		this.setState({ nick: event.nativeEvent.text });
	}

	onPwdChange(event) {
		this.setState({ pwd: event.nativeEvent.text });
	}

	onOkPress() {
		const { nick, pwd } = this.state;
		this.setState({ pending: true });

		this.runAction('loginRequest', nick, pwd)
			.then(this.onLoginSuccess)
			.catch(this.onLoginError);
	}

	onLoginSuccess() {
		this.setState({ pending: false, error: false });
		this.runAction('loginSuccess');
		this.props.onSuccess();
	}

	onLoginError() {
		this.setState({ pending: false, error: true });
		this.runAction('loginError');
		this.props.onError();
	}
};