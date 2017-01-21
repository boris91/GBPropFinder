import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import App from '../src/client/app/index';

it('renders correctly', () => {
	renderer.create(<App/>);
});
