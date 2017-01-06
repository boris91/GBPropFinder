import config from '../app/configs/index';

export default class Xhr {
	static host = config.services.xhr.host || '';
	static query = config.services.xhr.query || null;
	static headers = config.services.xhr.headers || null;

	static get(path, params) {
		return this.send('GET', path, params);
	}

	static post(path, params) {
		return this.send('POST', path, params);
	}

	static put(path, params) {
		return this.send('PUT', path, params);
	}

	static delete(path, params) {
		return this.send('DELETE', path, params);
	}

	static async send(method, path, params = {}) {
		const route = this.host ? `${this.host}/${path}` : path;
		const query = this._getStrQuery(this.query, params.query);
		const url = `${route}?${query}`;
		const options = {
			method,
			body: params.data || null,
			headers: {
				...this.headers,
				...params.headers
			}
		};
		//console.log({ url, options });

		try {
			return await (await fetch(url, options)).json();
		} catch (exc) {
			throw exc.message;
		}
	}

	static _getStrQuery(...objQueries) {
		return objQueries.reduce((arrQueries, objQuery) => {
			if (objQuery) {
				const queryKeys = Object.keys(objQuery);
				return arrQueries.concat(queryKeys.map(key => `${key}=${encodeURIComponent(objQuery[key])}`));
			} else {
				return arrQueries;
			}
		}, []).join('&');
	}
};