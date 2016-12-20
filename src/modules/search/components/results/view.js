import React from 'react';

import {
	List,
	TouchLight,
	View,
	Text
} from '../../../../components/all';

import {} from './styles';

export default class SearchResultsView extends React.Component {
	constructor(props) {
		super(props);
		const listDataSource = new List.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid });
		this.state = {
			items: listDataSource.cloneWithRows(this.props.results)
		};
		this.renderRow = this.renderRow.bind(this);
	}

	renderRow(data, sectionId, rowId) {
		const { title } = data;
		return (
			<TouchLight underlayColor="#dddddd">
				<View>
					<Text>{title}</Text>
				</View>
			</TouchLight>
		);
	}

	render() {
		return (
			<List dataSource={this.state.items} renderRow={this.renderRow}/>
		);
	}
};