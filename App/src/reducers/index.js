import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import PasswordRecoverReducer from './PasswordRecoverReducer';
import RegisterReducer from './RegisterReducer';
import FormReducer from './FormReducer';
import BooksReducer from './BooksReducer';
import { navigation } from './navigation';

// Este arquivo contem todos os reducers da aplicação. Cada arquivo contem
// um propósito específico na aplicação

export default combineReducers({  
  loginEmail: LoginReducer,
  forgotPassword: PasswordRecoverReducer,  
  registerUser: RegisterReducer,
  forms: FormReducer,
  bookData: BooksReducer,
  navigation,
});
