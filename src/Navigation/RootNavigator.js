import { StackNavigator } from 'react-navigation';

//Login
import LoginWithEmailScreen from '../screens/LoginStack/LoginWithEmailScreen';
import ForgotPassword from '../screens/LoginStack/ForgotPassword';
import CreateAccountWithEmail from '../screens/LoginStack/CreateAccountWithEmail';

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
      screen: CreateAccountWithEmail,
      path: 'createAccount'
    }
  },
  {
     initialRouteName: 'loginWithEmail', 
     headerMode: 'none'   
  }
);


const AppNavigator = StackNavigator(
  {
    loginStack: { screen: LoginStack },        
  },
  {
    initialRouteName: 'loginStack',
    headerMode: 'none'
  }
);


export default AppNavigator;
