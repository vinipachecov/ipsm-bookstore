import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import PasswordRecoverReducer from './PasswordRecoverReducer';
import RegisterReducer from './RegisterReducer';
import FormReducer from './FormReducer';
import BooksReducer from './BooksReducer';
import NavigationReducer from './NavigationReducer';

// Este arquivo contem todos os reducers da aplicação. Cada arquivo contem
// um propósito específico na aplicação

export default combineReducers({  
  userData: LoginReducer,
  forgotPassword: PasswordRecoverReducer,  
  registerUser: RegisterReducer,
  forms: FormReducer,
  bookData: BooksReducer,  
  navData: NavigationReducer
});
