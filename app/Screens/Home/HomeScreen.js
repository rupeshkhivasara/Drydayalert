import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; // Import LottieView
import LinearGradient from 'react-native-linear-gradient';
import Subscription from '../../Utils/Components/Subscription';
import Notifications from '../../Utils/Components/Notifications';
import CarouselComponent from '../../Utils/Components/CarouselComponent';
import {requestNotificationPermission} from '../../Utils/Helper/PermissionPopup';

const HomeScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      setLoading(true); // Show loading initially
      let fetchMobileNumber = await AsyncStorage.getItem('userID');
      const bodyData = new URLSearchParams();
      bodyData.append('mobile_no', fetchMobileNumber);

      const response = await fetch(
        'https://drydayalerts.in/admin_dryday/verify_user.php',
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
      setRefreshing(false); // Stop refreshing
    }
  };

  const fetchNotifications = async () => {
    try {
      let fetchState = await AsyncStorage.getItem('userState');
      const bodyData = new URLSearchParams();
      bodyData.append('state', fetchState);

      const response = await fetch(
        'https://drydayalerts.in/admin_dryday/last_notification.php',
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
      setRefreshing(false); // Stop refreshing
    }
  };

  const handlePullToRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    checkSubscriptionStatus(); // Call the subscription check function
  };

  const handleCancel = () => {
    BackHandler.exitApp();
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

  if (loading) {
    return (
      <LinearGradient
        colors={['#e0f7fa', '#b2ebf2']}
        style={styles.loadingContainer}>
        <LottieView
          source={require('../../Assets/Animation/Animation_1734431088601.json')} // Path to animation file
          autoPlay
          loop
          speed={2.5} // Slows down the animation
          style={styles.lottieLoader}
        />
        <Text style={styles.loadingText}>Loading Please Wait...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1D2671', '#C33764']} style={styles.container}>
      {isSubscribed ? (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handlePullToRefresh}
              colors={['#FF6347']} // Color of the loader
              tintColor="#FF6347" // iOS loader color
            />
          }>
          <CarouselComponent />
          <Notifications notifications={notifications} />
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.subscriptionContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handlePullToRefresh}
              colors={['#FF6347']}
              tintColor="#FF6347"
            />
          }>
          <Subscription />
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 20},
  subscriptionContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieLoader: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 30, // Larger size for bold impact
    fontStyle: 'italic',
    fontWeight: 'bold', // Ensure bold is retained
    color: '#FF6F61', // Funky coral color
    textShadowColor: '#FFB6C1', // Lighter pink shadow
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 9, // Bigger shadow for depth
    fontFamily: 'cursive', // Funky font (use custom font if available)
  },
});

export default HomeScreen;
