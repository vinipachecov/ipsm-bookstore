import {    
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_EMAIL_INVALID,
  LOGIN_USER_INVALID_CREDENTIALS,
  CLEAR_ERROR_ON_TYPE,
  LOGIN_GUEST_USER_SUCCEDED
} from '../Actions/ActionTypes';

const initialState = {
  loading: false,
  error: '',  
  success: '',
  user: undefined
};


export default (state = initialState, action) => {    
  switch (action.type) {            
    // Referentes ao processo de Login
    case LOGIN_USER:
      return { ...state, loading: true };       
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, error: '', user: action.payload };    
    // Referentes aos possíveis erros de Login
    case LOGIN_USER_EMAIL_INVALID:      
      return { ...state, loading: false, error: action.payload };
    case LOGIN_USER_INVALID_CREDENTIALS:
      return { ...state, loading: false, error: action.payload };       
    case CLEAR_ERROR_ON_TYPE:
      return { ...state, error: '' };
    case LOGIN_GUEST_USER_SUCCEDED:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
