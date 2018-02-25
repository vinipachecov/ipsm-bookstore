import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import PasswordRecoverReducer from './PasswordRecoverReducer';
import RegisterReducer from './RegisterReducer';
import FormReducer from './FormReducer';
import { navigation } from './navigation';

// Este arquivo contem todos os reducers da aplicação. Cada arquivo contem
// um propósito específico na aplicação

export default combineReducers({  
  loginEmail: LoginReducer,
  forgotPassword: PasswordRecoverReducer,  
  registerUser: RegisterReducer,
  forms: FormReducer,
  navigation,
});
