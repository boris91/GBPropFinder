import React from 'react';

import { NavAndroid, NavIos, Provider } from '../components/index';
import routes from './routes';
import store from './store/index';

export default ({ ios, android }) => {
	const Nav = ios ? NavIos : (android ? NavAndroid : null);

	return props => (
		<Provider store={store}>
			<Nav style={{ flex: 1 }}
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={(route, navigator) => <route.component {...route.passProps} navigator={navigator}/>}/>
		</Provider>
	);
};