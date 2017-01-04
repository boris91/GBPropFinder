import React from 'react';

import { Nav, Provider } from '../components/index';
import { auth, face } from './routes';
import store from './store/index';

export default props => (
	<Provider store={store}>
		<Nav auth={auth} face={face}/>
	</Provider>
);