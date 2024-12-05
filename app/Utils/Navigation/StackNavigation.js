import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';
import LoginScreen from '../../Screens/Login/LoginScreen';
import OtpScreen from '../../Screens/Otp/OtpScreen';
import Authenticate from '../../Screens/Login/Authenticate';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Authenticate'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Authenticate"
        component={Authenticate}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
};
export default StackNavigation;
