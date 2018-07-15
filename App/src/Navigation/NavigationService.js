import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}


function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  reset
};
