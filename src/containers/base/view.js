import React from 'react';

import * as components from '../../components/index';
import * as containers from '../../containers/index';
import * as services from '../../services/index';

export default class Base extends React.Component {
	static components = components;
	get services() { return services; }
	get containers() { return containers; }
};