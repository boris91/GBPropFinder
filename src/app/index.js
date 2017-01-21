import React from 'react';
import { AppRegistry } from 'react-native';

import Navi from '../containers/navi/view';
import routes, { auth, face } from './routes';
import configs from './configs/index';
import store from './store/index';
import actions from './actions';

const App = props => (
	<Navi auth={auth} face={face} configs={configs.containers} routes={routes} store={store} actions={actions}/>
);

AppRegistry.registerComponent('mios', () => App);

export default App;