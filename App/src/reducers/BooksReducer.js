import { SEND_BOOKS } from '../Actions/ActionTypes';

const initialState = {
  bookList: []  
};

export default (state = initialState, action) => {
  switch (action.type) {

  case SEND_BOOKS:
    return { ...state, bookList: action.payload };
  default:
    return state;
  }
};
