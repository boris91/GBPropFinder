import React from 'react';

import { Nav } from '../components/index';
import { routes, routeMapper, renderScene } from './routes';
import * as _ from './styles';

export default props => (
	<Nav style={_.navigator}
		initialRoute={routes[0]}
		initialRouteStack={routes}
		renderScene={renderScene}/>
);