import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export const createOrganization = (organization) => {
  const currentUser = firebase.auth().currentUser;

  console.log('User uid = ', currentUser.uid);
  console.log('criando organização..');

  console.log('Usuario logado => ', currentUser);

  return async (dispatch) => {
    try {      
      console.log('data written!');
      
      await firebase.database().ref(`/users/${currentUser.uid}`)
        .set({ organization });
      dispatch(NavigationActions.navigate({ routeName: '' }));
    } catch (error) {
      console.log(error);      
    }
  };
};
