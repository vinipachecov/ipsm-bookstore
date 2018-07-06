import firebase from 'firebase';

export const getBooks = () => {  
  return new Promise(async resolve => {

    const snapshot = await firebase.database().ref('livros/').once('value');    
    const bookListJSON = snapshot.val();    
     const bookListArray = Object.keys(bookListJSON).map(item => {
      return bookListJSON[item];      
    });    
    
    resolve(bookListArray);
  });
};
