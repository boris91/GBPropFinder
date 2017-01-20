import {
	ActivityIndicator,
	Image,
	Navigator,
	Switch,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

import Btn from './btn/view';
import Fld from './fld/view';
import List from './list/view';
import Menu from './menu/view';
import Pager from './pager/view';
import Pwd from './pwd/view';

const Navbar = Navigator.NavigationBar;

export {
	ActivityIndicator as Spinner,
	Btn,
	Fld,
	Image as Img,
	List,
	Menu,
	Navigator as Nav,
	Navbar,
	Pager,
	Pwd,
	Switch as Check,
	Text as Txt,
	TouchableHighlight as Touch,
	View as Div
};