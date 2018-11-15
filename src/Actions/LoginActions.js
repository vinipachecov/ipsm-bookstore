import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';



import {  
  LOGIN_USER,
  LOGIN_USER_EMAIL_INVALID,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_INVALID_CREDENTIALS,
  CLEAR_ERROR_ON_TYPE,  
  LOGIN_GUEST_USER_SUCCEDED
} from './ActionTypes';
import Errors from '../Messages/Errors.json';
import NavigationService from '../Navigation/NavigationService';
import { getBooks } from './BookActions';


/**
 * Sign in user with it's input credentials
 */
export const SignInUser = ({ email, password }) => {  

  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    try {
      console.log(email, password);
      await firebase.auth().signInWithEmailAndPassword(email, password);                                 
    } catch (error) {      
      console.log(error.code);      
      signInUserFailed(dispatch, error.code);
    }     
  };  
};

export const LogOut = () => {
  return async dispatch => {
    firebase.auth().signOut();
    dispatch({ type: LOGIN_USER_SUCCESS, payload: '' });
  };
}
  

/**
 * Get data as a signed in user
 */
export const alreadySignedIn = (user) => {
  return async dispatch => {   
    await getBooks(dispatch);  
    signInUserSucess(dispatch, user);    
    //console.log(NavigationService);   
    NavigationService.navigate('home');    
  }; 
};

/**
 * Get booklist, Navigate to user home but with no signed user
 */
export const signInAsGuest = () => {
  return async dispatch => {    
    dispatch({ type: LOGIN_USER });
    await getBooks(dispatch);      
    NavigationService.navigate('home');    
    dispatch({ type: LOGIN_GUEST_USER_SUCCEDED, payload: '' });      
  };
};

/**
 * Send signed user to redux 
 */
const signInUserSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS, payload: user 
  });
};

/**
 * send user message error 
 */
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

/**
 * Not being used now....
 */
export const createAccountWithEmail = () => {  
  return (dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'createAccount' }));
  };
};

/**
 * Clear error data
 */
export const clearErrorMessageOnType = () => ({
  type: CLEAR_ERROR_ON_TYPE,
  payload: ''
});


