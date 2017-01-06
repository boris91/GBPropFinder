export const auth = {
	defaultProps: {
		title: 'Enter your credentials',
		nickHolder: 'Nickname',
		pwdHolder: 'Password',
		btnText: 'Sign in',
		errorMessage: 'Auth failed: check your nickname & password for validity.',
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
		noDataMessage: 'No data provided. Try again later.',
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
		dataSrcAttrs: { rowHasChanged: (r1, r2) => r1.id !== r2.id },
		noResultsMessage: 'No results found for your query.',
		requestFailMessage: 'Reqeust failed. Try again later.'
	}
};