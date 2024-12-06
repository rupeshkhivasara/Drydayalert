
import React, {useEffect} from 'react';
import {
  Text,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './app/Utils/Helper/RootNavigation';
import StackNavigation from './app/Utils/Navigation/StackNavigation';
import PushNotification from 'react-native-push-notification';

function App() {
  useEffect(() => {
    setTimeout(function () {
      SplashScreen.hide();
    }, 2000);
    PushNotification.removeAllDeliveredNotifications();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigation />
    </NavigationContainer>
  );
}

export default App;
