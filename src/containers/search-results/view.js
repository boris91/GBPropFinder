import React from 'react';

import Base from '../base/view';
import * as _ from './styles';
import types from '../../modules/search/types';

const { List, Touch, Div, Spinner, Img, Txt } = Base.components;

export default class SearchResults extends Base {
	static defaultProps = Base.config.searchResults.defaultProps;

	constructor(props) {
		super(props);

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
		const { pending, error, errorMessage, results } = this.storeState.search;

		if (results) {
			if (0 === results.length) {
				return <Txt style={_.message}>{noResultsMessage}</Txt>;
			} else {
				return this.renderResults(results);
			}
		} else if (error) {
			return <Txt style={_.error}>{errorMessage}</Txt>;
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
		const { criteria, query } = this.storeState.search;
		return this.runAction(types.SEND_SEARCH_REQUEST, criteria, query, page)
			.then(this.onDataFetchSucceed)
			.catch(this.onDataFetchFailed);
	}

	onDataFetchSucceed({ request, response }) {
		const { application_response_code, total_pages, page, total_results, listings } = response;

		if ('1' === application_response_code.substr(0, 1)) {
			const data = {
				page,
				pagesCount: total_pages + 1,
				resultsCount: total_results,
				results: listings
			};
			this.runAction(types.RECEIVE_SEARCH_SUCCESS, data);
		} else {
			this.onDataFetchFailed();
		}
	}

	onDataFetchFailed() {
		this.runAction(types.RECEIVE_SEARCH_ERROR, this.props.requestFailMessage);
	}

	onRowPress(searchResult) {
		this.runAction(types.SELECT_SEARCH_RESULT, searchResult);
		this.navTo('search-result-details');
	}
};