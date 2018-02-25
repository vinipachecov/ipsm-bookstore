import {    
  RESET_PASSWORD,
  RESET_PASSWORD_EMAIL_SENT,  
  RESET_PASSWORD_USER_NOT_FOUND,
  RESET_PASSWORD_OTHER_ERROR,    
  RESET_EMAIL_SUCCESS,  
  CLEAR_ERROR_ON_TYPE,  
} from '../Actions/ActionTypes';

const initialState = {  
  error: '',
  loading: false,  
  success: ''
};

export default (state = initialState, action) => {
  switch (action.type) {          
    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_EMAIL_SENT:
      return { ...state, loading: false, sucess: action.payload };
    case RESET_PASSWORD_USER_NOT_FOUND:
      return { ...state, loading: false, error: action.payload };
    case RESET_PASSWORD_OTHER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET_EMAIL_SUCCESS: 
      return { ...initialState, success: action.payload };    
    case CLEAR_ERROR_ON_TYPE:
      return { ...state, error: '' };
    default:
      return { ...state };
  }
};

