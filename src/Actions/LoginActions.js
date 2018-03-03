import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';


import {  
  LOGIN_USER,
  LOGIN_USER_EMAIL_INVALID,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_INVALID_CREDENTIALS,
  CLEAR_ERROR_ON_TYPE
} from './ActionTypes';
import Errors from '../Messages/Errors.json';

export const SignInUser = ({ email, password }) => {
  console.log('starting login process...');
  console.log(email, password);

  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);               

      console.log('terminou com user  =', user);
      
      signInUserSucess(dispatch, user);         
      dispatch(NavigationActions.navigate({ routeName: 'home' }));     
    } catch (error) {      
      console.log(error.code);
      console.log(error);
      signInUserFailed(dispatch, error.code);
    }     
  };  
};
  
const signInUserSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS, payload: user 
  });
};

const signInUserFailed = (dispatch, errorCode) => {  
  switch (errorCode) {    
    case 'auth/invalid-email':    
      dispatch({
        type: LOGIN_USER_EMAIL_INVALID, payload: Errors['invalid-email']
      });      
      break;    
    default:
      dispatch({
        type: LOGIN_USER_INVALID_CREDENTIALS, payload: Errors['invalid-credentials']
      });      
  }  
};

export const createAccountWithEmail = () => {  
  return (dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'createAccount' }));
  };
};

export const clearErrorMessageOnType = () => ({
  type: CLEAR_ERROR_ON_TYPE,
  payload: ''
});
