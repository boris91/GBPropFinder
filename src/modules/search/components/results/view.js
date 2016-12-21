import React from 'react';

import {
	List,
	TouchLight,
	View,
	Spinner,
	Text
} from '../../../../components/all';

import {
	_container_,
	_error_
} from './styles';

export default class SearchResultsView extends React.Component {
	static defaultProps = {
		param: '',
		query: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			pending: true,
			error: '',
			pagesCount: 0,
			page: 0,
			resultsCount: 0,
			results: null
		}
		this.dataSrcAttrs = { rowHasChanged: (r1, r2) => r1.guid !== r2.guid };
		this.renderRow = this.renderRow.bind(this);
		this.onDataFetchSucceed = this.onDataFetchSucceed.bind(this);
		this.onDataFetchFailed = this.onDataFetchFailed.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<View style={_container_}>
				{this.renderContent()}
			</View>
		);
	}

	renderContent() {
		const { pending, error, results } = this.state;

		if (results) {
			return this.renderResults(results);
		} else if (error) {
			return <Text style={_error_}>{error}</Text>;
		} else if (pending) {
			return <Spinner size="large" color="#909090"/>;
		}
	}

	renderResults(results) {
		const dataSrc = new List.DataSource(this.dataSrcAttrs).cloneWithRows(results);
		return (
			<List dataSource={dataSrc} renderRow={this.renderRow}/>
		);
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

	fetchData(page = 1) {
		const { apiUrl, param, query } = this.props;
		const url = `${apiUrl}&${param}=${encodeURIComponent(query)}&page=${page}`;

		return fetch(url)
			.then(response => response.json())
			.then(this.onDataFetchSucceed)
			.catch(this.onDataFetchFailed);
	}

	onDataFetchSucceed({ request, response }) {
		const { application_response_code, total_pages, page, total_results, listings } = response;
		const isQueryValid = '1' === application_response_code.substr(0, 1);

		this.setState({
			pending: false,
			error: isQueryValid ? '' : this.props.invalidQueryMessage,
			pagesCount: isQueryValid ? total_pages + 1 : 0,
			page: isQueryValid ? page : 0,
			resultsCount: isQueryValid ? total_results : 0,
			results: isQueryValid ? listings : null
		});
	}

	onDataFetchFailed(error) {
		this.setState({
			pending: false,
			pagesCount: 0,
			page: 0,
			resultsCount: 0,
			results: null,
			error: this.props.requestFailMessage
		});
	}
};