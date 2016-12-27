import React from 'react';

import { Nav } from '../components/index';
import { initialRoute, routes } from './configs/routes';

export default props => (
	<Nav style={{ flex: 1 }}
		initialRoute={initialRoute}
		initialRouteStack={routes}
		renderScene={(route, navigator) => <route.component {...route.passProps} navigator={navigator}/>}/>
);