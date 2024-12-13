import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceNumber from 'react-native-device-number';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('<<fcmToken>>', token);
        // AsyncStorage.setItem('fcmToken', token);
        setDeviceToken(token);
      });
    setTimeout(function () {
      setDeviceNumber();
    }, 2400);
  }, []);

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

    return () => backHandler.remove(); // Clean up
  }, [exitApp]);

  const setDeviceNumber = () => {
    DeviceNumber.get()
      .then(res => {
        setMobileNumber(res.mobileNumber.slice(3, 13));
      })
      .catch(e => console.error(e));
  };

  const states = [
    'Select State',
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const handleLogin = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!deviceToken || deviceToken === '') {
      Alert.alert('Error', 'Something went wrong ! Please try again sometime.');
      return;
    }
    if (!selectedState || selectedState === 'Select State') {
      Alert.alert('Error', 'Please select a state.');
      return;
    }

    try {
      const bodyData = new URLSearchParams();
      bodyData.append('mobile_no', mobileNumber); // Add mobile number
      bodyData.append('state', selectedState); // Add state
      bodyData.append('token', deviceToken); // Add token

      const response = await fetch(
        'https://globalmahasabha.com/DALRT/login.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyData.toString(), // Convert to URL-encoded string
        },
      );

      const data = await response.json(); // Parse the response as JSON

      if (data.success === true) {
        // Alert.alert('Success', 'Login successful.');
        AsyncStorage.setItem('userID', mobileNumber);
        AsyncStorage.setItem('userState', selectedState);
        navigation.navigate('Home', {mobileNumber, state: selectedState});
      } else {
        //   Alert.alert('Error', data.message || 'Failed to login.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../Assets/Fonts/Images/back.jpg')}
      style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Dry Day Alerts</Text>
        <Text style={styles.subtitle}>Ab Plan Karo Befikar...</Text>
        <TouchableWithoutFeedback onPress={setDeviceNumber}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#ccc"
              value={mobileNumber}
              editable={false} // Non-editable input
            />
          </View>
        </TouchableWithoutFeedback>
        <Picker
          selectedValue={selectedState}
          onValueChange={itemValue => setSelectedState(itemValue)}
          style={styles.picker}>
          {states.map((state, index) => (
            <Picker.Item key={index} label={state} value={state} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#4682B4'}]}
          onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6347',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
