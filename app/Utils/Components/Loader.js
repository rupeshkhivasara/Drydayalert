import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View, Dimensions} from 'react-native';

const Loader = ({navigation, loadingState}) => {
  return (
    <>
      {loadingState ? (
        <View style={[styles.container]}>
          <ActivityIndicator
            animating={loadingState}
            size="large"
            color="#f7931e"
          />
        </View>
      ) : (
        <View />
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height:
      Platform.OS == 'android'
        ? Dimensions.get('window').height - 140
        : Dimensions.get('window').height - 170,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    // backgroundColor: global.ISTHEME === 'light' ? '#FFFFFF' : '#000',
    zIndex: 9999,
    marginTop: 60,
  },
});
