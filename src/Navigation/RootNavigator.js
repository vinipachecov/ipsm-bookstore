import { StackNavigator } from 'react-navigation';

//Login
import LoginWithEmailScreen from '../screens/LoginStack/LoginWithEmailScreen';
import ForgotPassword from '../screens/LoginStack/ForgotPassword';
import CreateAccountWithEmail from '../screens/LoginStack/CreateAccountWithEmail';

import HomeScreen from '../screens/HomeStack/HomeScreen';
import BookList from '../screens/HomeStack/BookList';

const HomeStack = StackNavigator({
    home: { screen: HomeScreen },
    bookList: { screen: BookList }
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
    homeStack: { screen: HomeStack }     
  },
  {
    initialRouteName: 'loginStack',
    headerMode: 'none'
  }
);


export default AppNavigator;
