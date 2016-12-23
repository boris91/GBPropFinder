import React from 'react';
import { Fld } from '../all';

export default props => (
	<Fld {...props} secureTextEntry={true}>{props.children}</Fld>
);