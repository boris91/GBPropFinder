import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { List, Touch, Div, Spinner, Img, Txt } = Base.components;

export default class SearchResults extends Base {
	static ID = 'search-results';
	static defaultProps = Base.config.searchResults.defaultProps;

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
			<Div style={_.container}>
				{this.renderContent()}
			</Div>
		);
	}

	renderContent() {
		const { noResultsMessage } = this.props;
		const { pending, error, results } = this.state;

		if (results) {
			if (0 === results.length) {
				return <Txt style={_.message}>{noResultsMessage}</Txt>;
			} else {
				return this.renderResults(results);
			}
		} else if (error) {
			return <Txt style={_.error}>{error}</Txt>;
		} else if (pending) {
			return <Spinner style={_.spinner} size="large" color="#909090"/>;
		}
	}

	renderResults(results) {
		const dataSrc = new List.DataSource(this.dataSrcAttrs).cloneWithRows(results);
		return (
			<List dataSource={dataSrc} renderRow={this.renderRow}/>
		);
	}

	renderRow(data, sectionId, rowId) {
		const { img_url: uri, price_formatted: price, title } = data;

		return (
			<Touch onPress={() => this.onRowPress(data)} underlayColor="#dddddd">
				<Div>
					<Div style={_.result}>
						<Img style={_.resultThumb} source={{ uri }}/>
						<Div style={_.resultText}>
							<Txt style={_.resultPrice}>{price}</Txt>
							<Txt style={_.resultTitle} numberOfLines={1}>{title}</Txt>
						</Div>
					</Div>
					<Div style={_.separator}/>
				</Div>
			</Touch>
		);
	}

	fetchData(page) {
		const { param, query } = this.props;
		return this.services.Api.search(param, query, page)
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

	onRowPress(data) {
		this.navTo('search-result-details', data);
	}
};