import * as auth from '../modules/auth/actions';
import * as search from '../modules/search/actions';
import * as storage from '../modules/storage/actions';

export default {
	...auth,
	...search,
	...storage
};