import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import PhonePePaymentSDK from 'react-native-phonepe-pg'
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

const Subscription = ({ onSubscribe, onExit }) => {
    
    const [requestBody, setRequestBody] = useState('');
    const [merchantId, setMerchantId] = useState('PGTESTPAYUAT86');
    const [appId, setAppId] = useState(null);
  
    const [checksum, setChecksum] = useState('');
  
    const [openEnvironment, setOpenEnvironment] = useState(false);
    const [environmentDropDownValue, setEnvironmentValue] = useState('SANDBOX');
  
    const [packageName, setPackageName] = useState('');
    const [callbackURL, setCallbackURL] = useState('reactDemoAppScheme');
    const generateMerchantTransactionId = (prefix = "DDA") => {
        // Current timestamp in milliseconds
        const timestamp = Date.now();
      
        // Generate a random 4-digit number
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
      
        // Combine prefix, timestamp, and random number
        return `${prefix}_${timestamp}_${randomNumber}`;
      };
    const initPhonePeSDK = () => {
        console.log("########");
        
        PhonePePaymentSDK.init(
          environmentDropDownValue,
          merchantId,
          appId,
          true
        ).then(result => {
          console.log("#######45",result);
          const requestBody = {
            merchantId: merchantId,
            merchantTransactionId:generateMerchantTransactionId(),
            merchantUserId: '',
            amount: '100',
            callbackURL: 'reactDemoAppScheme://',
            mobileNumber: "9999999999",
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        }
            const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
            const salt_index = 1;
            const payload = JSON.stringify(requestBody);
            const payload_main = Base64.encode(payload);
            const string = payload_main+"/pg/v1/pay"+salt_key;
            const checksum = sha256(string) + '###' + salt_index;

            PhonePePaymentSDK.startTransaction(payload_main,checksum,null,null).then(result => {
                console.log("#######65",result);
               
              }).catch(error => {
              })
          
        }).catch(error => {
            console.log("########71",error);
            
        })
    }

      
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
                    <TouchableOpacity style={styles.button} onPress={() => {initPhonePeSDK()}}>
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
