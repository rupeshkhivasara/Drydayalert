import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';

const OtpScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState('');
  const {mobileNumber} = route.params; // Get mobile number from route params

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    try {
      // const response = await fetch('https://example.com/api/verify-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({mobile: mobileNumber, otp}),
      // });

      // const data = await response.json();

      // if (response.ok) {
      Alert.alert('Success', 'OTP verified successfully.');
      navigation.navigate('Home'); // Navigate to Home screen
      // } else {
      //   Alert.alert('Error', data.message || 'OTP verification failed.');
      // }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
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
});

export default OtpScreen;
