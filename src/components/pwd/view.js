import { Fld, React } from '../index';

export default props => (
	<Fld {...props} secureTextEntry={true}>{props.children}</Fld>
);