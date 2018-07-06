import { NavigationActions } from 'react-navigation';
import RootNavigator from '../Navigation/RootNavigator';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init());

export const navigation = (state = initialState, action) => {
  const newState = RootNavigator.router.getStateForAction(action, state);
  return newState || state;
};
