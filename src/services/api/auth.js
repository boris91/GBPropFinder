import configs from '../../app/configs/index';
import { Storage } from '../index';

const config = configs.services.api.auth;

export const loginSilently = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const creds = await getCredsFromStorage();
			await login(creds.nick, creds.pwd, true);
			resolve(creds);
		} catch (exc) {
			reject();
		}
	});
};

export const login = (nick, pwd, saveCreds) => {
	return new Promise(async (resolve, reject) => {
		await (saveCreds ? setCredsToStorage(nick, pwd) : removeCredsFromStorage());
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

const setCredsToStorage = (nick, pwd) => Storage.set(config.credsStorageKey, { nick, pwd });
const getCredsFromStorage = () => Storage.get(config.credsStorageKey);
const removeCredsFromStorage = () => Storage.remove(config.credsStorageKey);