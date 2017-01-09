import * as auth from '../modules/auth/actions';
import * as search from '../modules/search/actions';

export default {
	...auth,
	...search
};