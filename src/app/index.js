import React from 'react';

import Navi from '../containers/navi/view';
import { auth, face } from './routes';
import store from './store/index';
import actions from './actions';

export default props => (
	<Navi auth={auth} face={face} store={store} actions={actions}/>
);