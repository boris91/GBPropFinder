export const xhr = {
	host: 'http://api.nestoria.co.uk/api'
};

export const api = {
	auth: {
		nick: 'admin',
		pwd: 'admin'
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