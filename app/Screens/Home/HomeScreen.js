import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler, ToastAndroid} from 'react-native';

const HomeScreen = () => {
  const [exitApp, setExitApp] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
