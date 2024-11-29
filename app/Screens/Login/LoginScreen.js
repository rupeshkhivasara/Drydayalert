import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Import Picker component
import DeviceNumber from 'react-native-device-number';

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('<<fcmToken>>', token);
        AsyncStorage.setItem('fcmToken', token);
      });
    setDeviceNumber();
  }, []);

  const setDeviceNumber = () => {
    DeviceNumber.get()
      .then(res => {
        setMobileNumber(res.mobileNumber.slice(3, 13));
      })
      .catch(e => setShowLogin(true));
  };
  const states = [
    'Select State', // Placeholder option
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

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!selectedState || selectedState === 'Select State') {
      Alert.alert('Error', 'Please select a state.');
      return;
    }

    try {
      const response = await fetch('https://example.com/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({mobile: mobileNumber, state: selectedState}),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP sent successfully.');
        navigation.navigate('Otp', {mobileNumber, state: selectedState}); // Pass mobile number and state to OTP screen
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <Picker
        selectedValue={selectedState}
        onValueChange={itemValue => setSelectedState(itemValue)}
        style={styles.picker}>
        {states.map((state, index) => (
          <Picker.Item key={index} label={state} value={state} />
        ))}
      </Picker>
      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default LoginScreen;
