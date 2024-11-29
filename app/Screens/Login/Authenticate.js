import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Utils/Components/Loader';
import messaging from '@react-native-firebase/messaging';

const Authenticate = ({navigation}) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    checkPermission();
    checkLogin();
  }, []);

  handelNotification = async () => {
    await messaging().onNotificationOpenedApp(async remoteMessage => {
      await AsyncStorage.getItem('userID').then(value => {
        navigation.navigate('Home');
      });
    });
    await messaging().onMessage(remoteMessage => {});
  };

  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      handelNotification();
    } catch (error) {}
  };

  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      handelNotification();
    } else {
      requestPermission();
    }
  };

  checkLogin = async () => {
    await AsyncStorage.getItem('userID').then(value => {
      if (value) {
        navigation.navigate('Home');
        return;
      } else {
        navigation.navigate('Login');
      }
    });
  };

  return (
    <View>
      <Loader loadingTxt={'Loading...'} loadingState={spinner} />
    </View>
  );
};
export default Authenticate;
