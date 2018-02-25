import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import {
  REGISTER_USER_SUCCESS,  
  FORM_ERROR,  
  FORM_SUBMIT,
  INTERNET_ISSUE
} from '../Actions/ActionTypes';

import Errors from '../Messages/Errors.json';

export const registerUser = (email, password, passwordConfirm) => {    
    if (email === '') {
      return { 
        type: FORM_ERROR,     
        payload: Errors['register-user-error']
      };      
    }
    
    if (password !== passwordConfirm) {
      return { 
        type: FORM_ERROR,     
        payload: Errors['register-user-password-dont-match']
      };
    }

    if (password === '' || passwordConfirm === '') {
      return { 
        type: FORM_ERROR,     
        payload: Errors['register-user-password-empty'] 
      };
    }  
    return async (dispatch) => {
      dispatch({ type: FORM_SUBMIT });      
      try {              
        const user = await 
          firebase.auth().createUserWithEmailAndPassword(email, password);          
        console.log(user);
        
        registerSuccess(dispatch, user);      
        goToLandingPage(dispatch);
      } catch (error) {
        console.log('Error', error);        
        registerFailed(dispatch, error.code);
      }   
    };
};

const registerSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
};

const registerFailed = (dispatch, code) => {
  switch (code) {    
    case 'auth/network-request-failed':
      return dispatch({
        type: INTERNET_ISSUE,
        payload: Errors['internet-connection-failure']
      });
    default:
      dispatch({
        type: FORM_ERROR,
        payload: Errors['register-user-error']
      });    
  }    
};

const goToLandingPage = (dispatch) => {
  dispatch(NavigationActions.navigate({ routeName: 'landingPage' }));
};

