import { combineReducers } from 'redux';

import login from '../../modules/login/reducer';
import search from '../../modules/search/reducer';

export default combineReducers({
	login,
	search
});