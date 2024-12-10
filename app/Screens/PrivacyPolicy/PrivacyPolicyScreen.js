import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const PrivacyPolicyScreen = () => {
  return (
    <WebView
      source={{
        uri: 'http://docs.google.com/gview?embedded=true&url=https://globalmahasabha.com/DALRT/Privacy_policy_for_dry_day_alerts_app.pdf',
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
