import { NavigationActions } from 'react-navigation';

export const navigationBack = () => {  
  console.log('RETURNING');
  return (dispatch) => {
     dispatch(NavigationActions.back());
  };
};

export const loginWithEmail = () => {    
  return (dispatch) => {
     dispatch(NavigationActions.navigate({ routeName: 'loginWithEmail' }));
  };
};

export const navigateToScreen = (route) => {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: route }));
  };
};
