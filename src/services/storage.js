import { AsyncStorage } from 'react-native';

import configs from '../app/configs/index';

const config = configs.services.storage;

export default class Storage {
	static async getItems() {
		const keys = (await AsyncStorage.getAllKeys()).filter(key => key.startsWith(config.preKey));
		const values = (await Promise.all(keys.map(key => AsyncStorage.getItem(key))));
		return values.reduce((items, value, i) => {
			items[keys[i]] = unstringify(value);
			return items;
		}, {});
	}

	static get(key) {
		return new Promise(async (resolve, reject) => {
			try {
				const value = await AsyncStorage.getItem(config.preKey + key);
				(null === value) ? reject() : resolve(unstringify(value));
			} catch(exc) {
				reject();
			}
		});
	}

	static getFew(...keys) {
		return new Promise(async (resolve, reject) => {
			try {
				keys = keys.map(key => config.preKey + key);
				const values = await AsyncStorage.multiGet(keys);
				values.forEach((value, i) => values[i] = unstringify(value));
				resolve(values);
			} catch(exc) {
				reject();
			}
		});
	}

	static set(key, value) {
		return AsyncStorage.setItem(config.preKey + key, stringify(value));
	}

	static setFew(...kvPairs) {
		kvPairs.forEach(pair => {
			pair[0] = config.preKey + pair[0];
			pair[1] = stringify(pair[1]);
		});
		return AsyncStorage.multiSet(kvPairs);
	}

	static remove(key) {
		return AsyncStorage.removeItem(config.preKey + key);
	}

	static removeFew(...keys) {
		keys = keys.map(key => config.preKey + key);
		return AsyncStorage.multiRemove(keys);
	}

	static merge(key, value) {
		return AsyncStorage.mergeItem(config.preKey + key, stringify(value));
	}

	static mergeFew(...kvPairs) {
		kvPairs.forEach(pair => {
			pair[0] = config.preKey + pair[0];
			pair[1] = stringify(pair[1]);
		});
		return AsyncStorage.multiMerge(kvPairs);
	}
};

const stringify = value => {
	if ('object' === typeof value) {
		return config.preVal.object + JSON.stringify(value);
	}
	return value;
};

const unstringify = value => {
	if (0 === value.indexOf(config.preVal.object)) {
		return JSON.parse(value.replace(config.preVal.object, ''));
	}
	return value;
};