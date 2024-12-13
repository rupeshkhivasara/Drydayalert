import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Utils/Components/Loader';
import messaging from '@react-native-firebase/messaging';

const Authenticate = ({ navigation }) => {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    checkPermission();
    checkLogin();
  }, []);

  const handelNotification = async () => {
    try {

      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log("########167", remoteMessage);

        await AsyncStorage.getItem('userID').then(value => {
          navigation.navigate('Home');
        });
      });
      await messaging().onMessage(remoteMessage => {
        console.log("########", remoteMessage);

      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("Background Notification Received:", remoteMessage);
      });

      messaging().createNotificationChannel({
        id: 'default',
        name: 'Default Channel',
        importance: messaging.Android.Importance.HIGH,
      });
    } catch (error) {
      console.error("Notification Handling Error:", error);
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      handelNotification();
    } catch (error) { }
  };

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      handelNotification();
    } else {
      requestPermission();
    }
  };

  const checkLogin = async () => {
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
