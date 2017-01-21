import { createStore, combineReducers } from 'redux';

import modules from '../../modules/index';
import middleware from './middleware';

const reducers = {};
const preloadedState = {};

Object.keys(modules).forEach(moduleName => {
	const module = modules[moduleName];
	reducers[moduleName] = module.reducer;
	preloadedState[moduleName] = module.initialState;
});

export default createStore(combineReducers(reducers), preloadedState, middleware);