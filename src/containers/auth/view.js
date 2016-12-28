import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Div, Txt, Btn } = Base.components;

export default class Auth extends Base {
	static ID = 'auth';
	static route = Base.config.auth.route;
	static defaultProps = Base.config.auth.defaultProps;

	constructor(props) {
		super(props);

		this.onLoginPress = this.onLoginPress.bind(this);
		this.loginProps = {
			onSuccess: this.onLoginSuccess.bind(this),
			onError: this.onLoginError.bind(this)
		};
	}

	render() {
		const { title, loginBtnText } = this.props;

		return (
			<Div style={_.container}>
				<Txt style={_.title}>{title}</Txt>
				<Div style={_.row}>
					<Btn style={_.button} text={loginBtnText} onPress={this.onLoginPress}/>
				</Div>
			</Div>
		);
	}

	onLoginPress() {
		this.navTo('login', this.loginProps);
	}

	onLoginSuccess() {
		this.navTo('search', null, true);
	}

	onLoginError() {
		//do nothing
	}
};