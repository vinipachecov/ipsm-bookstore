import {    
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  PASSWORD_CONFIRM_CHANGE,
  CLEAR_ERROR_ON_TYPE,
  FORM_SUBMIT,
  FORM_SUBMIT_FINISH,
  FORM_ERROR
} from '../Actions/ActionTypes';

const initialState = {  
  email: '',
  password: '',
  passwordConfirm: '',  
  loading: '',
  error: ''
};


export default (state = initialState, action) => {    
  switch (action.type) {            
    case EMAIL_CHANGE:
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload, error: '' };    
    case PASSWORD_CONFIRM_CHANGE:
      return { ...state, passwordConfirm: action.payload, error: '' }; 
    case CLEAR_ERROR_ON_TYPE: 
      return { ...state, error: '' };
    case FORM_SUBMIT:
      return { ...state, loading: true };
    case FORM_SUBMIT_FINISH:
      return { ...state, loading: false };
    case FORM_ERROR:
      return { ...state, loading: false, error: action.payload };     
    default:
      return { ...state };
  }
};
