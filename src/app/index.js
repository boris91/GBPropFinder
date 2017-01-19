import React from 'react';

import Navi from '../containers/navi/view';
import routes, { auth, face } from './routes';
import configs from './configs/index';
import store from './store/index';
import actions from './actions';

export default props => (
	<Navi auth={auth} face={face} configs={configs.containers} routes={routes} store={store} actions={actions}/>
);