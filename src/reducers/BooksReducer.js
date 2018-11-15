import { SEND_BOOKS, DELETED_BOOK } from '../Actions/ActionTypes';

const initialState = {
  bookList: []  
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SEND_BOOKS:
    return { 
      ...state, 
      bookList: action.payload.map(item => {
        return { ...item };
      }) 
    };
  case DELETED_BOOK:
    return { 
      ...state, 
      bookList: state.bookList.filter(item => item.id !== action.payload) 
    };
  default:
    return state;
  }
};
