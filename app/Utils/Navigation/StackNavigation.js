import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Screens/Home/HomeScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
    </Stack.Navigator>
  );
};
export default StackNavigation;
