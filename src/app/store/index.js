import { createStore } from 'redux';

import reducers from './reducers';
import preloadedState from './initial-state';
import middleware from './middleware';

export default createStore(reducers, preloadedState, middleware);