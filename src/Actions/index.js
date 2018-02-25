import * as LoginActions from './LoginActions';
import * as PasswordRecoverActions from './PasswordRecoverActions';
import * as RegisterActions from './RegisterActions';
import * as UserActions from './UserActions';
import * as FormActions from './FormActions';
import * as Navigation from './Navigation';


export const ActionCreators = Object.assign({ }, {
  FormActions,
  RegisterActions,
  LoginActions,
  PasswordRecoverActions,  
  UserActions,
  Navigation
});
