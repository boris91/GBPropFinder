import React from 'react';
import { ListView } from 'react-native';

export default class List extends React.Component {
	static defaultProps = {
		rows: [],
		dataSrcAttrs: { rowHasChanged: (r1, r2) => r1 !== r2 },
		renderRow(data, sectionId, rowId) { return null; }
	};

	render() {
		const dataSrc = new ListView.DataSource(this.props.dataSrcAttrs).cloneWithRows(this.props.rows);
		return (
			<ListView dataSource={dataSrc} renderRow={this.props.renderRow}/>
		);
	}
};