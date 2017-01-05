import {
	ActivityIndicator,
	Image,
	Navigator,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import Map from 'react-native-maps';
import { Provider } from 'react-redux';

import Btn from './btn/view';
import Fld from './fld/view';
import List from './list/view';
import Pager from './pager/view';
import Pwd from './pwd/view';

const Navbar = Navigator.NavigationBar;

export {
	ActivityIndicator as Spinner,
	Btn,
	Fld,
	Image as Img,
	List,
	Map,
	Navigator as Nav,
	Navbar,
	Pager,
	Provider,
	Pwd,
	Text as Txt,
	TouchableHighlight as Touch,
	View as Div
};