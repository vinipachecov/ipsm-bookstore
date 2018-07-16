import { NavigationActions } from 'react-navigation';

/**
 * Navigate back using redux
 */
export const navigationBack = () => {  
  console.log('RETURNING');
  return (dispatch) => {
     dispatch(NavigationActions.back());
  };
};

/**
 * Navigate to LoginEmail
 */
export const loginWithEmail = () => {    
  return (dispatch) => {
     dispatch(NavigationActions.navigate({ routeName: 'loginWithEmail' }));
  };
};

/**
 * Generic navigation function
 */
export const navigateToScreen = (route) => {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: route }));
  };
};
