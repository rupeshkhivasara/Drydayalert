import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

// Request permissions
export const requestNotificationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    {
      title: 'Notification Permission',
      message: 'This app needs notification permissions to notify you.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification permissions granted!');
  } else {
    console.log('Notification permissions denied.');
  }
};
