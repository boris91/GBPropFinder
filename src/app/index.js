import React from 'react';
import { Provider } from 'react-redux';

import { Nav } from '../components/index';
import routes from './routes';
import store from '../store/index';

export default props => (
	<Provider store={store}>
		<Nav style={{ flex: 1 }}
			initialRoute={routes[0]}
			initialRouteStack={routes}
			renderScene={(route, navigator) => (
				<route.component {...route.passProps} navigator={navigator}/>
			)}/>
	</Provider>
);