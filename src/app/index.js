import React from 'react';

import Navi from '../containers/navi/view';
import { auth, face } from './routes';
import store from './store/index';

export default props => (
	<Navi auth={auth} face={face} store={store}/>
);