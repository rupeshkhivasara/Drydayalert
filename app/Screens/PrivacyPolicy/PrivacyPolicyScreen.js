import React, {useEffect} from 'react';
import {StyleSheet, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import {navigationRef} from '../../Utils/Helper/RootNavigation';

const PrivacyPolicyScreen = props => {
  let fetchVal = props.route.params.ftVal;

  useEffect(() => {
    const handleBackPress = () => {
      // Navigate back to the previous screen
      props.navigation.goBack();
      return true; // Prevent default back behavior
    };

    // Add back button event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [props.navigation]);

  return (
    <WebView
      source={{
        uri:
          fetchVal == 'privacy'
            ? 'https://www.drydayalerts.in/privacy_policy.html'
            : 'https://www.drydayalerts.in/refund_policy.html',
      }}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default PrivacyPolicyScreen;
