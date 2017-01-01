import { AppRegistry } from 'react-native';
import App from './src/app/index';

AppRegistry.registerComponent('mios', () => App({ ios: true, android: false }));