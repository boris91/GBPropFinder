import configs from '../../app/configs/index';
import { Storage } from '../index';

const config = configs.services.api.auth;

export const login = (nick, pwd, store) => {
	return new Promise((resolve, reject) => {
		store ? setCreds(nick, pwd) : removeCreds();
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

export const getCreds = () => Storage.get(config.storageCredsKey);

const setCreds = (nick, pwd) => Storage.set(config.storageCredsKey, { nick, pwd });

const removeCreds = () => Storage.remove(config.storageCredsKey);