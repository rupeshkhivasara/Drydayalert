import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  FlatList,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestNotificationPermission} from '../../Utils/Helper/PermissionPopup';
import Carousel from 'react-native-snap-carousel';
import CarouselComponent from '../../Utils/Components/CarouselComponent';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exitApp, setExitApp] = useState(false);

  const carouselData = [
    {
      rating: 4.5,
      review: 'Amazing app! Really helpful and easy to use.',
      userName: 'John Doe',
    },
    {
      rating: 5,
      review: 'Perfect experience, highly recommended!',
      userName: 'Jane Smith',
    },
    {
      rating: 4,
      review: 'Good features, but could use a bit of improvement.',
      userName: 'Emily Johnson',
    },
  ];

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
        BackHandler.exitApp(); // Exit the app
        return true;
      } else {
        setExitApp(true);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT); // Show a toast
        setTimeout(() => setExitApp(false), 2000); // Reset after 2 seconds
        return true; // Prevent default behavior
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
    <LinearGradient colors={['#fff9c4', '#ffecb3']} style={{height: '100%'}}>
      <View style={styles.modalOverlay}>
        {isSubscribed ? (
          <ScrollView contentContainerStyle={styles.reviewContainer}>
            <Text style={styles.reviewHeader}>User Reviews</Text>
            {/* <CarouselComponent data={carouselData} /> */}

            <View style={styles.notificationView}>
              {notifications.length > 0 ? (
                <LinearGradient
                  colors={['#FFB75E', '#ED8F03']} // Gradient colors
                  style={styles.ncard}>
                  <Text style={styles.ntitle}>
                    {notifications[0].notification_title}
                  </Text>
                  <Text style={styles.ndescription}>
                    {notifications[0].notification_description}
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={styles.noNotifications}>
                  No notifications found
                </Text>
              )}
            </View>
          </ScrollView>
        ) : (
          <ImageBackground
            source={require('../../Assets/Fonts/Images/back.jpg')}
            style={styles.modalOverlay}
            blurRadius={10}>
            <View style={styles.subscriptionPopup}>
              <View
                style={[
                  styles.subsnPopup,
                  {width: '100%', backgroundColor: '#fff'},
                ]}>
                <Text style={styles.popupTitle}>Subscribe Now</Text>
                <View style={styles.bulletContainer}>
                  <Text style={styles.popupText}>
                    • Your small decision, and tension-free one full year...
                  </Text>
                  <Text style={[styles.popupText, styles.highlightText]}>
                    • Only ₹25/- for one year notifications.
                  </Text>
                  <Text style={styles.popupText}>
                    --------------------------------------------------{' '}
                  </Text>
                  <Text style={styles.popupText}>
                    • आपका छोटा सा फैसला, और तनाव मुक्त एक पूरा साल...
                  </Text>
                  <Text style={[styles.popupText, styles.highlightText]}>
                    • एक साल की सूचनाओं के लिए केवल २५/- रु.
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.popupButton}
                    onPress={handleBuySubscription}>
                    <Text style={styles.popupButtonText}>Buy Subscription</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.exitButton}
                    onPress={handleCancel}>
                    <Text style={styles.exitButtonText}>Exit App</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionPopup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subsnPopup: {
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 10,
  },
  popupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#54181f',
    textAlign: 'center',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  bulletContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  popupButton: {
    backgroundColor: '#8a3843',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: '#4a3e40',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noNotifications: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  notificationView: {
    marginTop: 20,
    alignItems: 'center',
  },
  reviewContainer: {
    padding: 20,
    marginHorizontal: 20,
  },
  ncard: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  ntitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  ndescription: {
    fontSize: 16,
    color: '#fff',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    elevation: 3,
  },
  reviewText: {
    fontSize: 16,
    color: '#555',
  },
  reviewName: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  reviewRating: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
});

export default HomeScreen;
