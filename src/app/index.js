import React from 'react';

import { Nav, Provider } from '../components/index';
import routes from './routes';
import store from './store/index';

export default props => (
	<Provider store={store}>
		<Nav face={routes[0]}/>
	</Provider>
);