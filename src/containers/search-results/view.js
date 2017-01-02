import Base from '../base/view';
import * as _ from './styles';

const { Div, Img, List, Pager, React, Spinner, Txt, Touch } = Base.components;

export default class SearchResults extends Base {
	static defaultProps = Base.config.searchResults.defaultProps;

	constructor(props) {
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.onDataFetchSucceed = this.onDataFetchSucceed.bind(this);
		this.onDataFetchFailed = this.onDataFetchFailed.bind(this);
		this.onPagerPrevPress = this.onPagerPrevPress.bind(this);
		this.onPagerNextPress = this.onPagerNextPress.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { noResultsMessage } = this.props;
		const { pending, error, errorMessage, results, page, pagesCount } = this.storeState.search;
		const pager = <Pager disabled={pending} btnStyle={_.pagerButton} current={page} count={pagesCount} onPrevPress={this.onPagerPrevPress} onNextPress={this.onPagerNextPress}/>

		if (results) {
			if (0 === results.length) {
				return (
					<Div style={_.container}>
						<Txt style={_.message}>{noResultsMessage}</Txt>
					</Div>
				);
			} else {
				return (
					<Div style={_.container}>
						{pager}
						<List rows={results} renderRow={this.renderRow} dataSrcAtrs={this.dataSrcAttrs}/>
					</Div>
				);
			}
		} else if (error) {
			return (
				<Div style={_.container}>
					<Txt style={_.error}>{errorMessage}</Txt>
				</Div>
			);
		} else if (pending) {
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

	fetchData(page = 1) {
		const { criteria, query } = this.storeState.search;

		this.runAction(this.types.SET_SEARCH_RESULTS_PAGE, page);

		return this.runAction(this.types.SEND_SEARCH_REQUEST, criteria, query, page)
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
			this.runAction(this.types.RECEIVE_SEARCH_SUCCESS, data);
		} else {
			this.onDataFetchFailed();
		}
	}

	onDataFetchFailed() {
		this.runAction(this.types.RECEIVE_SEARCH_ERROR, this.props.requestFailMessage);
	}

	onRowPress(resultId) {
		this.runAction(this.types.SELECT_SEARCH_RESULT, resultId);
		this.navTo('search-result-details');
	}

	onPagerPrevPress() {
		this.fetchData(this.storeState.search.page - 1);
	}

	onPagerNextPress() {
		this.fetchData(this.storeState.search.page + 1);
	}
};