export const auth = {
	defaultProps: {
		title: 'Authenticate to the application',
		loginBtnText: 'Log In'
	}
};

export const login = {
	defaultProps: {
		title: 'Enter your credentials',
		nickHolder: 'Nickname',
		pwdHolder: 'Password',
		btnText: 'Sign in',
		errorMessage: 'Login failed: check your nickname & password for validity.',
		onSuccess() {},
		onError() {}
	}
};

export const search = {
	defaultProps: {
		title: 'Search for property (by place name, post code or location).',
		queryHolder: 'Place/postcode',
		imageSrc: require('../images/house.png'),
		invalidQueryMessage: 'Query\'s invalid. Please, enter the correct one.',
		invalidGpsLocation: 'GPS location couldn\'t be obtained properly. Try again later.',
		requestFailMessage: 'Reqeust failed. Try again later.',
		noDataMessage: 'No data provided. Try again later.',
		QueryParam: {
			PLACE: 'place_name',
			GPS: 'centre_point'
		},
		mapInitialRegion: {
			latitude: 51.5074,
			longitude: 0.1278,
			latitudeDelta: 0,
			longitudeDelta: 0
		}
	}
};

export const searchResultDetails = null;

export const searchResults = {
	defaultProps: {
		noResultsMessage: 'No results found for your query.',
		param: '',
		query: ''
	}
};