import React from 'react';
import {
	NavigatorIOS
} from 'react-native';

import { initialRoute } from './routes';
import { navigator } from './styles';

export default props => (
	<NavigatorIOS
		style={navigator}
		initialRoute={initialRoute}
		renderScene={() => <initialRoute.component/>}
	/>
);