import React from 'react';
import SideMenu from 'react-native-side-menu';

import { Div, Btn } from '../index';
import * as _ from './styles';

export default class Menu extends React.Component {
	static defaultProps = {
		onItemSelect(id) { console.log(`"${id}" menu item selected.`); }
	};

	render() {
		return (
			<SideMenu menuPosition="right" menu={this.renderItems()}>{this.props.children}</SideMenu>
		);
	}

	renderItems() {
		const { items, onItemSelect } = this.props;
		return (
			<Div style={_.container}>
				{
					items.map(({ id, title }) => (
						<Btn text={title} onPress={onItemSelect.bind(null, id)} key={`menu-item:${id}`}/>
					))
				}
			</Div>
		);
	}
};