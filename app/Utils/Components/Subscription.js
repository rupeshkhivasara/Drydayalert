import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

const Subscription = ({ onSubscribe, onExit }) => {
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
                  <Text style={[styles.text, styles.highlightText,]}>
                    • Only ₹25/- for one year notifications.
                  </Text>
                 
                  <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  }}
/>               
                  <Text style={styles.text}>
                    • आपका छोटा सा फैसला, और तनाव मुक्त एक पूरा साल...
                  </Text>
                  <Text style={[styles.text, styles.highlightText]}>
                    • एक साल की सूचनाओं के लिए केवल २५/- रु.
                  </Text>
         




                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onSubscribe}>
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
        backgroundColor: '#fff', color: '#000',
        padding: 20, borderRadius: 10, elevation: 5
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 10 },
    text: { fontSize: 16, marginBottom: 20, color: '#000', },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    button: {
        backgroundColor: '#8a3843',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: { color: '#fff' },
});

export default Subscription;
