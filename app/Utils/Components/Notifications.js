import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Notifications = ({ notifications }) => {
  return (
    // background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
    <LinearGradient
    colors={['#051937', '#008793']} // Gradient colors
    style={styles.ncard}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{notification.notification_title}</Text>
            <Text style={styles.description}>
              {notification.notification_description}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noNotifications}>No notifications found</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {  padding: 15, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' , color: '#fff',marginBottom: 10 },
  description: { fontSize: 16 ,color: '#fff'},
  noNotifications: { textAlign: 'center', fontSize: 16 },
  ncard: {
    width: '90%',
    padding: 15,
    marginTop: 40,
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
});

export default Notifications;
