import React from 'react';

import { Nav } from '../components/index';
import routes from './routes';

export default props => (
	<Nav style={{ flex: 1 }}
		initialRoute={routes[0]}
		initialRouteStack={routes}
		renderScene={(route, navigator) => <route.component {...route.passProps} navigator={navigator}/>}/>
);