import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Subscription from '../../Utils/Components/Subscription';
import Notifications from '../../Utils/Components/Notifications';
import CarouselComponent from '../../Utils/Components/CarouselComponent';
import {requestNotificationPermission} from '../../Utils/Helper/PermissionPopup';

const HomeScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      let fetchMobileNumber = await AsyncStorage.getItem('userID');
      const bodyData = new URLSearchParams();
      bodyData.append('mobile_no', fetchMobileNumber);

      const response = await fetch(
        'https://globalmahasabha.com/DALRT/verify_user.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyData.toString(),
        },
      );
      const data = await response.json();
      const isVerified =
        data.server_response && data.server_response[0]?.is_verified === '1';
      if (isVerified) {
        setIsSubscribed(true);
        fetchNotifications();
      } else {
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      Alert.alert(
        'Error',
        'Unable to check subscription status. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      let fetchState = await AsyncStorage.getItem('userState');
      const bodyData = new URLSearchParams();
      bodyData.append('state', fetchState);

      const response = await fetch(
        'https://globalmahasabha.com/DALRT/last_notification.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyData.toString(),
        },
      );
      const data = await response.json();
      setNotifications(data.server_response || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert(
        'Error',
        'Unable to fetch notifications. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBuySubscription = () => {
    navigation.navigate('SubscriptionScreen');
  };

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        BackHandler.exitApp();
        return true;
      } else {
        setExitApp(true);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        setTimeout(() => setExitApp(false), 2000);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    requestNotificationPermission();
    return () => backHandler.remove();
  }, [exitApp]);

  const handleCancel = () => {
    BackHandler.exitApp();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
    colors={['#1D2671', '#C33764']}

    style={styles.container}>
      {!isSubscribed ? (
        <ScrollView contentContainerStyle={styles.content}>
          <CarouselComponent />
          <Notifications notifications={notifications} />
        </ScrollView>
      ) : (
        <Subscription />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20 },
});

export default HomeScreen;
