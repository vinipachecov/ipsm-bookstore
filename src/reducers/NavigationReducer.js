import { SEND_INITIAL_ROUTE } from "../Actions/ActionTypes";

const initialState = {
  initialRoute: ''
};

export default (state = initialState, action) => {
  console.log(state,action);  
  switch (action.type) {

  case SEND_INITIAL_ROUTE:
    return { ...state, initialRoute: action.payload };
  default:
    return state;
  }
};
