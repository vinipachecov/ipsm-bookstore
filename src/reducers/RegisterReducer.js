import { 
  REGISTER_USER_SUCCESS,  
} from '../Actions/ActionTypes';

const initialState = {  
  user: null
};

export default (state = initialState, action) => {    
  switch (action.type) {    
    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload };           
    default:
      return { ...state };
  }
};
