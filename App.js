
import React, {useEffect} from 'react';
import {
  Text,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './app/Utils/Navigation/StackNavigation'

function App (){
  useEffect(() => {
    setTimeout(function () {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return(
    <NavigationContainer ref={navigationRef}>
      {/* <Text>Hello Prashant How are you.</Text> */}
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App;
