import { AppRegistry } from 'react-native';
// We need buffer and text-enconding to run dab
import 'text-encoding-polyfill';
import { Buffer } from 'buffer';

global.Buffer = Buffer;
import App from './App';

AppRegistry.registerComponent('test', () => App);
