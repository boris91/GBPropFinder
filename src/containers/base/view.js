import React from 'react';

import config from '../../app/configs/index';
import * as components from '../../components/index';
import * as containers from '../../containers/index';
import * as services from '../../services/index';

export default class Base extends React.Component {
	static config = config.containers;
	static components = components;
	get config() { return config.containers[this.containerId]; }
	get services() { return services; }
	get containers() { return containers; }
};