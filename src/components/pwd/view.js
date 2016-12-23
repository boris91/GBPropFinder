import React from 'react';
import { Input } from '../all';

export default props => (
	<Input {...props} secureTextEntry={true}>{props.children}</Input>
);