export const xhr = {
	host: 'http://api.nestoria.co.uk/api'
};

export const storage = {
	preKey: '@mios:',
	preVal: {
		object: '@object:'
	}
};

export const api = {
	auth: {
		nick: 'admin',
		pwd: 'admin',
		credsStorageKey: 'auth_creds'
	},
	search: {
		criteriaTypes: {
			PLACE: 'place_name',
			GPS: 'centre_point'
		},
		queryParams: {
			action: 'search_listings',
			encoding: 'json'
		}
	}
};