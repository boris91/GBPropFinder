import { Xhr } from '../index';
import configs from '../../app/configs/index';

const config = configs.services.api.search;
const cache = {};
let lastCacheKey = '';

export default (criteriaKey, criteriaValue, page = 1) => {
	const cacheKey = lastCacheKey = `${criteriaKey}=${criteriaValue}&page=${page}`;
	if (cache.hasOwnProperty(cacheKey)) {
		return new Promise((resolve, reject) => {
			if (cache[cacheKey]) {
				resolve(cache[cacheKey]);
			} else {
				reject();
			}
		});
	}

	return new Promise((resolve, reject) => {
		Xhr.get('', {
			query: {
				...config.queryParams,
				page,
				[criteriaKey]: criteriaValue
			}
		}).then(({ request, response }) => {
			if ('1' === response.application_response_code.substr(0, 1)) {
				const { total_pages, page, total_results, listings } = response;
				cache[cacheKey] = {
					page,
					pagesCount: total_pages + 1,
					resultsCount: total_results,
					results: listings.map(convertResult)
				};
				if (cacheKey === lastCacheKey) {
					resolve(cache[cacheKey]);
				}
			} else {
				cache[cacheKey] = null;
				if (cacheKey === lastCacheKey) {
					reject();
				}
			}
		}).catch(() => {
			cache[cacheKey] = null;
			if (cacheKey === lastCacheKey) {
				reject();
			}
		});
	});
};

const convertResult = result => ({
	id: result.lister_url.split('/')[4],
	title: result.title,
	uri: result.img_url,
	summary: result.summary,
	price: result.price_formatted,
	attrs: [
		`Property type: ${result.property_type}`,
		`Bedrooms count: ${result.bedroom_number}`,
		`Bathrooms count: ${result.bathroom_number}`
	].join('\n')
});