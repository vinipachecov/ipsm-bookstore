import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

//Login
import LoginWithEmailScreen from '../screens/LoginStack/LoginWithEmailScreen';
import ForgotPassword from '../screens/LoginStack/ForgotPassword';
import CreateAccountWithEmail from '../screens/LoginStack/CreateAccountWithEmail';
import LoginOptions from '../screens/LoginStack/LoginOptions';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import BookScreen from '../screens/HomeStack/BookScreen';
import drawerComponent from '../screens/drawerComponent';

const HomeStack = createStackNavigator({
    home: { screen: HomeScreen },
    bookScreen: { screen: BookScreen }
  },
  {
     headerMode: 'none'   
  }
);


const LoginStack = createStackNavigator(
  {    
    loginOptions: {
      screen: LoginOptions
    },
    loginWithEmail: { 
      screen: LoginWithEmailScreen,       
    },    
    forgotPassword: {
      screen: ForgotPassword      
    },
    createAccount: {
      screen: CreateAccountWithEmail      
    },    
  },  
  {     
     headerMode: 'none'   
  }
);

const homeNavigator = createDrawerNavigator({
  homeStack: { screen: HomeStack }
},
{
  contentComponent: drawerComponent  
});

const AppNavigator = createSwitchNavigator(
  {
    loginStack: { screen: LoginStack },   
    homeStack: { screen: homeNavigator }     
  },
  {    
    headerMode: 'none'
  }
);


export default AppNavigator;
