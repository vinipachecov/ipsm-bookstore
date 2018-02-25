import { 
  CLEAR_ERROR_ON_TYPE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  PASSWORD_CONFIRM_CHANGE 
} from './ActionTypes';

export const clearErrorMessage = () => ({
  type: CLEAR_ERROR_ON_TYPE,
  payload: ''
});

export const onEmailChange = (emailText) => ({
  type: EMAIL_CHANGE,
  payload: emailText
});

export const onPasswordChange = (emailText) => ({
  type: PASSWORD_CHANGE,
  payload: emailText
});

export const onPasswordConfirmChange = (emailText) => ({
  type: PASSWORD_CONFIRM_CHANGE,
  payload: emailText
});

