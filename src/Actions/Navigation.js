import { NavigationActions } from 'react-navigation';

/**
 * Navigate back using redux
 */
export const navigationBack = () => {  
  //console.log('RETURNING');
  return (dispatch) => {
     dispatch(NavigationActions.back());
  };
};


