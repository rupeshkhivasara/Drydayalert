import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subscription = ({onSuccess}) => {
  const onExit = () => {
    BackHandler.exitApp();
  };
  const makePayments = async () => {
    try {
      // Fetch mobile number from AsyncStorage
      let fetchMobileNumber = await AsyncStorage.getItem('userID');

      // Fetch order_id from your server API
      const response = await fetch(
        'https://drydayalerts.in/admin_dryday/generate_order.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch order_id');
      }

      const data = await response.json();

      if (!data.id) {
        throw new Error('Invalid order_id response');
      }

      // Prepare Razorpay options with fetched order_id
      var options = {
        description: 'Credits towards dry day alerts subscription',
        image: 'https://drydayalerts.in/admin_dryday/ic_launcher.png',
        currency: 'INR',
        // key: 'rzp_test_RNTxiIsLzHtupN', // Test key for Razorpay key
        key: 'rzp_live_kelcxKjGKY9a0K', // Live key for Razorpay key
        // amount: 5 * 100, // Test amount (₹5)
        amount: 29 * 100, // Fixed amount (₹29)
        name: 'Dry Day Alerts',
        order_id: data.id, // Use the fetched order_id
        prefill: {
          contact: '91' + fetchMobileNumber, // User's mobile number
        },
        theme: {color: '#53a20e'},
      };

      // Open Razorpay Checkout
      RazorpayCheckout.open(options)
        .then(async paymentData => {
          // Handle successful payment
          // Alert.alert(
          //   'Payment Success',
          //   `Payment ID: ${paymentData.razorpay_payment_id}`,
          // );

          // Fetch mobile number from AsyncStorage
          const mobile_no = await AsyncStorage.getItem('userID');

          // Call the API to update user status
          const updateApiUrl =
            'https://drydayalerts.in/admin_dryday/update_user_status.php';
          const updatePayload = {
            payment_id: paymentData.razorpay_payment_id,
            order_id: paymentData.razorpay_order_id,
            signature: paymentData.razorpay_signature,
            mobile_no: mobile_no,
          };
          //   console.log('Sending payload to API:', updatePayload);
          try {
            const response = await fetch(updateApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatePayload),
            });

            const result = await response.json();

            if (response.ok) {
              // console.log('User status updated successfully:', result);
              onSuccess();
            } else {
              // console.error('Failed to update user status:', result.error);
            }
          } catch (error) {
            // console.error('Error calling update API:', error);
          }
        })
        .catch(error => {
          // Handle payment failure
          Alert.alert(
            'Payment Failed Please Try Again Later.',
            // `Error: ${error.code} | ${error.description}`,
          );
        });
    } catch (error) {
      // Handle API or other errors
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../Assets/Fonts/Images/back.jpg')}
      style={styles.container}
      blurRadius={10}>
      <View style={styles.popup}>
        <Text style={styles.title}>Subscribe Now</Text>

        <Text style={styles.text}>
          • Your small decision, and tension-free one full year...
        </Text>
        <Text style={[styles.text, styles.highlightText]}>
          • Pay ₹29/- for six months and enjoy the next six months absolutely free!
        </Text>


        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />
        <Text style={styles.text}>
          • आपका छोटा सा फैसला, और तनाव मुक्त एक पूरा साल...
        </Text>
        <Text style={[styles.text, styles.highlightText]}>
          • केवल २९/- रु. में पहले छह महीने का लाभ उठाएं और अगले छह महीने पूरी तरह मुफ्त पाएं!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={makePayments}>
            <Text style={styles.buttonText}>Buy Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onExit}>
            <Text style={styles.buttonText}>Exit App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popup: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 10},
  text: {fontSize: 16, marginBottom: 20, color: '#000'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  button: {
    backgroundColor: '#8a3843',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {color: '#fff'},
});

export default Subscription;
