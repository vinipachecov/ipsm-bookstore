import { StackNavigator } from 'react-navigation';

//Login
import LoginWithEmailScreen from '../screens/LoginStack/LoginWithEmailScreen';
import ForgotPassword from '../screens/LoginStack/ForgotPassword';
import CreateAccountWithEmail from '../screens/LoginStack/CreateAccountWithEmail';
import LoginOptions from '../screens/LoginStack/LoginOptions';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import BookScreen from '../screens/HomeStack/BookScreen';

const HomeStack = StackNavigator({
    home: { screen: HomeScreen },
    bookScreen: { screen: BookScreen }
  },
  {
     headerMode: 'none'   
  }
);

const LoginStack = StackNavigator(
  {    
    loginWithEmail: { 
      screen: LoginWithEmailScreen, 
      path: 'loginWithEmail',      
    },    
    forgotPassword: {
      screen: ForgotPassword,
      path: 'forgotPassword'
    },
    createAccount: {
      screen: CreateAccountWithEmail      
    },
    loginOptions: {
      screen: LoginOptions
    }
  },  
  {
     initialRouteName: 'loginOptions', 
     headerMode: 'none'   
  }
);


const AppNavigator = StackNavigator(
  {
    loginStack: { screen: LoginStack },   
    homeStack: { screen: HomeStack }     
  },
  {
    initialRouteName: 'loginStack',
    headerMode: 'none'
  }
);


export default AppNavigator;
