import firebase from 'firebase';
import { SEND_BOOKS } from './ActionTypes';

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


export const updateBook = (book, id) => {
  return async dispatch => {
    console.log('recebeu o livro atualizado ', book);
    try {
      await firebase.database().ref(`/livros/${id}`).set(
        {
          ...book
        }
      );
      const newBookList = await getBooks();
      dispatch({ type: SEND_BOOKS, payload: newBookList });
    } catch (error) {
      console.log(error);
    }    
  };
};