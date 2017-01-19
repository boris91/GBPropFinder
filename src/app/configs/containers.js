export default {
	'auth': {
		title: 'Enter your credentials',
		nickHolder: 'Nickname',
		pwdHolder: 'Password',
		btnText: 'Sign in',
		checkText: 'Remember me',
		errorMessage: 'Auth failed: check your nickname & password for validity.'
	},

	'search': {
		title: 'Search for property (by place name, post code or location).',
		queryHolder: 'Place/postcode',
		imageSrc: require('../images/house.png'),
		noDataMessage: 'No data provided. Try again later.',
		mapInitialRegion: {
			latitude: 51.5074,
			longitude: 0.1278,
			latitudeDelta: 0,
			longitudeDelta: 0
		}
	},

	'search-result-details': null,

	'search-results': {
		dataSrcAttrs: { rowHasChanged: (r1, r2) => r1.id !== r2.id },
		noResultsMessage: 'No results found for your query.',
		errorMessage: 'Reqeust failed. Try again later.'
	}
};