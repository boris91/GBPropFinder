import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default applyMiddleware(
	thunk,
	createLogger({
		predicate: () => __DEV__,
		collapsed: () => true,
		titleFormatter: ({ type }) => `${type[0]}${type.slice(1).split('_').join(' ').toLowerCase()}`
	})
);