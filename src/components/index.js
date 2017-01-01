import {
	ActivityIndicator,
	Image,
	Navigator,
	NavigatorIOS,
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

export {
	ActivityIndicator as Spinner,
	Btn,
	Fld,
	Image as Img,
	List,
	Map,
	Navigator as NavAndroid,
	NavigatorIOS as NavIos,
	Pager,
	Provider,
	Pwd,
	Text as Txt,
	TouchableHighlight as Touch,
	View as Div
};