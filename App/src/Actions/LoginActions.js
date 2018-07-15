import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import { getBooks } from './FirebaseActions'


import {  
  LOGIN_USER,
  LOGIN_USER_EMAIL_INVALID,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_INVALID_CREDENTIALS,
  CLEAR_ERROR_ON_TYPE,
  SEND_BOOKS
} from './ActionTypes';
import Errors from '../Messages/Errors.json';

export const SignInUser = ({ email, password }) => {  

  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);                     
    } catch (error) {      
      console.log(error.code);
      console.log(error);
      signInUserFailed(dispatch, error.code);
    }     
  };  
};
  

export const alreadySignedIn = (user) => {
  return async dispatch => {
    const bookList = await getBooks();  
    signInUserSucess(dispatch, user);
    dispatch({ type: SEND_BOOKS, payload: bookList });    
    dispatch(NavigationActions.navigate({ routeName: 'home' }));     
  }; 
};

export const signInAsGuest = () => {
  return async dispatch => {
    const bookList = await getBooks();  
      dispatch({ type: SEND_BOOKS, payload: bookList });
      dispatch(NavigationActions.navigate({ routeName: 'home' }));     
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


