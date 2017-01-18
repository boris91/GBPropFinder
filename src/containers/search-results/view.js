import React from 'react';

import Base from '../base/view';
import * as _ from './styles';

const { Div, Img, List, Pager, Spinner, Txt, Touch } = Base.components;

export default class SearchResults extends Base {
	static defaultProps = Base.config.searchResults.defaultProps;

	constructor(props) {
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.onPagerPrevPress = this.onPagerPrevPress.bind(this);
		this.onPagerNextPress = this.onPagerNextPress.bind(this);
	}

	componentDidMount() {
		this.search(1);
	}

	render() {
		const { noResultsMessage, errorMessage } = this.props;
		const { query, pending, error, results, page } = this.data.search;
		const requestedResults = results[query] && results[query][page];
		const pagesCount = results[query] && results[query].pagesCount || 1;
		const loading = pending || !requestedResults;
		const pager = <Pager disabled={loading} btnStyle={_.pagerButton} current={page} count={pagesCount}
							onPrevPress={this.onPagerPrevPress} onNextPress={this.onPagerNextPress}/>;

		if (requestedResults) {
			if (0 === requestedResults.length) {
				return (
					<Div style={_.container}>
						<Txt style={_.message}>{noResultsMessage}</Txt>
					</Div>
				);
			} else {
				return (
					<Div style={_.container}>
						{pager}
						<List rows={requestedResults} renderRow={this.renderRow} dataSrcAtrs={this.dataSrcAttrs}/>
					</Div>
				);
			}
		} else if (error) {
			return (
				<Div style={_.container}>
					<Txt style={_.error}>{errorMessage}</Txt>
				</Div>
			);
		} else if (loading) {
			return (
				<Div style={_.container}>
					{pager}
					<Spinner style={_.spinner} size="large" color="#909090"/>
				</Div>
			);
		}
	}

	renderRow(data, sectionId, rowId) {
		const { id, uri, price, title } = data;

		return (
			<Touch onPress={() => this.onRowPress(id)} underlayColor="#dddddd">
				<Div>
					<Div style={_.result.container}>
						<Img style={_.result.thumb} source={{ uri }}/>
						<Div style={_.result.text.container}>
							<Txt style={_.result.text.price}>{price}</Txt>
							<Txt style={_.result.text.title} numberOfLines={1}>{title}</Txt>
						</Div>
					</Div>
					<Div style={_.separator}/>
				</Div>
			</Touch>
		);
	}

	async onRowPress(resultId) {
		await this.selectSearchResult(resultId);
		this.navTo('search-result-details');
	}

	onPagerPrevPress() {
		const { page } = this.data.search;
		this.search(page - 1);
	}

	onPagerNextPress() {
		const { page } = this.data.search;
		this.search(page + 1);
	}
};