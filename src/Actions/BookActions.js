import firebase from 'firebase';
import { ToastAndroid } from 'react-native';
import { SEND_BOOKS, FORM_SUBMIT, FORM_SUBMIT_FINISH, DELETED_BOOK } from './ActionTypes';

export const updateBookLIst = () => async(dispatch) => {
  await firebase.database().ref('livros/').once('value', snapshot => {  
    console.log('pegando livros');
        const bookListJSON = snapshot.val();             
        const bookListArray = Object.keys(bookListJSON).map(item => {
         return { id: item, ...bookListJSON[item] };      
       });        
       dispatch({ type: SEND_BOOKS, payload: bookListArray });      
  });
};


export const getBooks = (dispatch) => {  
  return new Promise(async resolve => {    
    await firebase.database().ref('livros/').on('value', snapshot => {  
      console.log('pegando livros');
      const bookListJSON = snapshot.val();        
      console.log('LISTA DE LIVROS = ', bookListJSON);
      const bookListArray = Object.keys(bookListJSON).map(item => {
       return { id: item, ...bookListJSON[item] };      
     });        
     dispatch({ type: SEND_BOOKS, payload: bookListArray });       
     resolve();
    });        
  });
};


export const deleteBook = (id) => {
  return async dispatch => {
    dispatch({ type: FORM_SUBMIT, payload: '' });     
    try {
      const ref = firebase.database().ref(`livros/${id}`);
      await ref.remove();
      ToastAndroid.show('Livro removido com sucesso.', ToastAndroid.SHORT);
      dispatch({ type: DELETED_BOOK, payload: id });      
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });      
    } catch (error) {      
      ToastAndroid.show('Erro ao tentar deletar livro. Tente novamente', ToastAndroid.LONG);
      console.log(error);
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });      
    }
  };
};

/**
 * Send book to firebase and update its data
 * @param {*} book 
 * @param {*} id 
 */
export const updateBook = (book, id) => {
  return async dispatch => {
    dispatch({ type: FORM_SUBMIT, payload: '' });     
    try {
      await firebase.database().ref(`/livros/${id}`).set(
        {
          ...book
        }
      );
      // await getBooks(dispatch);      
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });
      ToastAndroid.show('Livro alterado com sucesso.', ToastAndroid.SHORT);
    } catch (error) {
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });      
    }    
  };
};

/**
 * Create a new book in firebase RTDB
 * @param {*} book 
 */
export const createBook = (book) => {
  return async dispatch => {
    dispatch({ type: FORM_SUBMIT, payload: '' });
    try {
      // send request to firebase
      const key = firebase.database().ref('livros/').push({
        ...book
      }).key;            
      
      // enviar novo livro para o redux para ser adicionado na lista atual de livros
      ToastAndroid.show('Livro criado com sucesso.', ToastAndroid.SHORT);
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });           
      return key;
    } catch (error) {
      ////console.log(error);      
      dispatch({ type: FORM_SUBMIT_FINISH, payload: '' });      
    }    
  };
};