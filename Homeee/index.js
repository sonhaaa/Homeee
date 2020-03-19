/**
 * @format
 */

import { AppRegistry } from 'react-native';
import LoginRegister from './screens/LoginRegister';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => LoginRegister);
