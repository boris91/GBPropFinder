import { Xhr } from './index';

export const login = (nick, pwd) => {
	return new Promise((resolve, reject) => {
		//TODO: remove this code when login API is accessible
		setTimeout(() => {
			if ('admin' === nick && 'admin' === pwd) {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
};

export const search = (criteriaKey, criteriaValue, page = 1) => {
	return Xhr.get('', {
		query: {
			page,
			[criteriaKey]: criteriaValue,
			action: 'search_listings',
			encoding: 'json'
		}
	});
};