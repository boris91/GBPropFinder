import configs from '../../app/configs/index';

const config = configs.services.api.login;

export default (nick, pwd) => {
	return new Promise((resolve, reject) => {
		//TODO: remove this code when login API is accessible
		setTimeout(() => {
			if (config.nick === nick && config.pwd === pwd) {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
};