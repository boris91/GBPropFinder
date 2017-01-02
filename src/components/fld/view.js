import { TextInput } from 'react-native';

import { React } from '../index';

export default props => (
	<TextInput {...props} autoCapitalize="none">{props.children}</TextInput>
);