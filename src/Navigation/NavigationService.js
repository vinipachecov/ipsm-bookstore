
import { NavigationActions } from 'react-navigation';

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

function navigateBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );  
}

function navigateBegin(key) {
  _navigator.dispatch(
    NavigationActions.back(key)
  );  
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigateBack,
  navigateBegin
};
