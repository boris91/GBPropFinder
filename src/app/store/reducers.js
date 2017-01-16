import { combineReducers } from 'redux';

import auth from '../../modules/auth/reducer';
import search from '../../modules/search/reducer';
import storage from '../../modules/storage/reducer';

export default combineReducers({
	auth,
	search,
	storage
});