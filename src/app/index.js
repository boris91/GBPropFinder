import React from 'react';

import { Provider } from '../components/index';
import Navi from '../containers/navi/view';
import { auth, face } from './routes';
import store from './store/index';

export default props => (
	<Provider store={store}>
		<Navi auth={auth} face={face}/>
	</Provider>
);