import { Xhr } from '../index';
import configs from '../../app/configs/index';

const config = configs.services.api.search;

export const search = (query, page) => {
	const criteria = isQueryGpsLocation(query) ? config.criteriaTypes.GPS : config.criteriaTypes.PLACE;
	return new Promise(async (resolve, reject) => {
		try {
			const { request, response } = await Xhr.get('', {
				query: {
					...config.queryParams,
					page,
					[criteria]: query
				}
			});

			if ('1' === response.application_response_code.substr(0, 1)) {
				const { total_pages, page, listings } = response;
				resolve({
					page,
					pagesCount: total_pages + 1,
					results: listings.map(convertResult)
				});
			} else {
				reject();
			}
		} catch (exc) {
			reject();
		}
	});
};

const isQueryGpsLocation = (query) => {
	const gpsPosition = query.split(',');
	if (2 === gpsPosition.length) {
		let latitude = parseFloat(gpsPosition[0]);
		let longitude = parseFloat(gpsPosition[1]);
		if (!isNaN(latitude) && !isNaN(longitude)) {
			return true;
		}
	}
	return false;
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