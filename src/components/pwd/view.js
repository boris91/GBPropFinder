import React from 'react';
import { Fld } from '../index';

export default props => (
	<Fld {...props} secureTextEntry={true}>{props.children}</Fld>
);