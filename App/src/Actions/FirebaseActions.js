import firebase from 'firebase';
import { SEND_BOOKS, FORM_SUBMIT, FORM_SUBMIT_FINISH } from './ActionTypes';


/**
 * Send a request to firebase to get all books
 * and return the list of books in an array
 */
export const getBooks = () => {  
  return new Promise(async resolve => {

    const snapshot = await firebase.database().ref('livros/').once('value');    
    const bookListJSON = snapshot.val();        
     const bookListArray = Object.keys(bookListJSON).map(item => {
      return { id: item, ...bookListJSON[item] };      
    });        
    resolve(bookListArray);
  });
};

/**
 * Send book to firebase and update its data
 * @param {*} book 
 * @param {*} id 
 */
export const updateBook = (book, id) => {
  return async dispatch => {
    dispatch({ type: FORM_SUBMIT, payload: '' });
    console.log('recebeu o livro atualizado ', book);    
    try {
      await firebase.database().ref(`/livros/${id}`).set(
        {
          ...book
        }
      );
      const newBookList = await getBooks();
      dispatch({ type: SEND_BOOKS, payload: newBookList });
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });
    } catch (error) {
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });
      console.log(error);
    }    
  };
};