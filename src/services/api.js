import { Xhr } from './index';
import fullConfig from '../app/configs/index';

const config = fullConfig.services.api;

export const login = (nick, pwd) => {
	return new Promise((resolve, reject) => {
		//TODO: remove this code when login API is accessible
		setTimeout(() => {
			if (config.login.nick === nick && config.login.pwd === pwd) {
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
			...config.search.queryParams,
			page,
			[criteriaKey]: criteriaValue
		}
	});
};