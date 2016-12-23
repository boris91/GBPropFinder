import React from 'react';

import { Div, Txt, Btn } from '../../components/all';
import Login from '../login/view';
import Search from '../search/view';

import * as _ from './styles';

export default class Auth extends React.Component {
	static route = {
		title: 'Authentication',
		component: Auth
	};

	static defaultProps = {
		title: 'Authenticate to the application',
		loginBtnText: 'Log In'
	};

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
		this.props.navigator.push({
			...Login.route,
			passProps: this.loginProps
		});
	}

	onLoginSuccess() {
		this.props.navigator.resetTo(Search.route);
	}

	onLoginError() {
		//do nothing
	}
};