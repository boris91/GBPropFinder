import React from 'react';
import { bindActionCreators } from 'redux';

import Navi from '../containers/navi/view';
import { auth, face } from './routes';
import store from './store/index';
import actions from './actions';

const boundActions = bindActionCreators(actions, store.dispatch.bind(store));

export default props => (
	<Navi auth={auth} face={face} store={store} actions={boundActions}/>
);