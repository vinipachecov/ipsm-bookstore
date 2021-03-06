import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { ToastAndroid } from 'react-native';

import {    
  RESET_PASSWORD,  
  RESET_PASSWORD_OTHER_ERROR,
  RESET_PASSWORD_USER_NOT_FOUND,
  RESET_EMAIL_SUCCESS,  
  CLEAR_ERROR_ON_TYPE,
} from '../Actions/ActionTypes';

import Errors from '../Messages/Errors.json';
import Success from '../Messages/Success.json';


/**
 * Send recover request to firebase and wait for user action on his email.
 */
export const recoverPassword = ({ email }) => {  
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD });
    try {
      await firebase.auth().sendPasswordResetEmail(email, null);      
      resetEmailSucess(dispatch, email);
      ToastAndroid.show('Pedido de resgate de senha concedido, verifique seu email', ToastAndroid.SHORT);
    } catch (error) {      
      console.log(error);
      resetEmailFail(dispatch, error, email);
    }
  };
};


const resetEmailSucess = (dispatch, email) => {     
  dispatch({ type: RESET_EMAIL_SUCCESS, payload: Success['reset-email-sent'] + email });
  dispatch(NavigationActions.back());
};

const resetEmailFail = (dispatch, error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      dispatch({
        type: RESET_PASSWORD_USER_NOT_FOUND, payload: Errors['reset-password-other-error']
      });
      break;    
  
    default:
      dispatch({
        type: RESET_PASSWORD_OTHER_ERROR, payload: error.message
      });
      break;          
  }
};

export const clearErrorMessageOnType = () => ({
  type: CLEAR_ERROR_ON_TYPE,
  payload: ''
});
