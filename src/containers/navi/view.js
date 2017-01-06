import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../app/actions';
import { Btn, Nav, Navbar, Txt } from '../../components/index';
import * as _ from './styles';

class Navi extends React.Component {
	constructor(props) {
		super(props);
		this.renderScene = this.renderScene.bind(this);
		this.navbarRouteMapper = {
			Title: this.renderNavbarTitle.bind(this),
			LeftButton: this.renderNavbarLeftButton.bind(this),
			RightButton: this.renderNavbarRightButton.bind(this)
		};
	}

	render() {
		const { face } = this.props;
		const navbar = <Navbar style={_.navbar} routeMapper={this.navbarRouteMapper}/>;

		return (
			<Nav style={_.navigator} initialRoute={face} renderScene={this.renderScene} navigationBar={navbar}/>
		);
	}

	renderScene(route, navigator) {
		const { auth, storeState, actions } = this.props;
		const sceneProps = { navigator, storeState, actions };

		return (!route.secure || storeState.auth.complete) ? (
			<route.component {...route.passProps} {...sceneProps}/>
		) : (
			<auth.component {...sceneProps}/>
		);
	}

	renderNavbarTitle(route, navigator, index, navState) {
		return <Txt style={_.navbarTitle}>{route.title}</Txt>;
	}

	renderNavbarLeftButton(route, navigator, index, navState) {
		if (0 === index) {
			return null;
		} else {
			const text = `< ${navState.routeStack[index - 1].title}`;
			return (
				<Btn style={_.navbarButton} text={text} underlayColor="transparent"
				     onPress={() => navigator.pop()}/>
			);
		}
	}

	renderNavbarRightButton(route, navigator, index, navState) {
		return null;
	}
};

export default connect(state => ({ storeState: state }), dispatch => ({ actions: bindActionCreators(actions, dispatch) }))(Navi);