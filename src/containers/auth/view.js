import React from 'react';

import { Btn, Check, Div, Fld, Pwd, Spinner, Txt } from '../../components/index';
import * as _ from './styles';

export default class Auth extends React.Component {
	static defaultProps = {
		onSuccess() {},
		onError() {}
	};

	constructor(props) {
		super(props);

		this.onNickChange = this.onNickChange.bind(this);
		this.onPwdChange = this.onPwdChange.bind(this);
		this.onCheckChange = this.onCheckChange.bind(this);
		this.onOkPress = this.onOkPress.bind(this);
	}

	async componentDidMount() {
		const { pending, complete } = this.props.data.auth;
		if (!complete && !pending) {
			try {
				await this.loginSilently();
				this.props.onSuccess();
			} catch (exc) {}
		}
	}

	render() {
		const {
			config: { title, nickHolder, pwdHolder, btnText, checkText, errorMessage },
			data: {
				auth: { pending, nick, pwd, saveCreds, error }
			}
		} = this.props;

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
				<Div sytle={_.row}>
					<Txt style={_.check.text}>{checkText}</Txt>
					<Check style={_.check.box} value={saveCreds} onValueChange={this.onCheckChange}/>
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

	onCheckChange(value) {
		this.setAuthSaveCreds(value);
	}

	async onOkPress() {
		try {
			await this.login();
			this.props.onSuccess();
		} catch (exc) {
			this.props.onError();
		}
	}
};