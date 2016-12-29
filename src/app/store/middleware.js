import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default applyMiddleware(
	thunk,
	createLogger({ predicate: () => __DEV__ })
);