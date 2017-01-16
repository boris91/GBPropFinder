import configs from '../../app/configs/index';

const config = configs.services.api.auth;

export const login = (nick, pwd, store) => {
	return new Promise((resolve, reject) => {
		//TODO: remove this code when auth API is accessible
		setTimeout(() => {
			if (config.nick === nick && config.pwd === pwd) {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
};