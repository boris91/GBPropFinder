import { createStore } from 'redux';

import reducer from '../reducers/index';
import preloadedState from './initial-state/index';
import middleware from './middleware';

export default createStore(reducer, preloadedState, middleware);