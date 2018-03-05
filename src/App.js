import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import configs from './configs/firebase';

import reducers from './reducers';
import AppNavigation, { reduxMiddleware } from './Navigation';

EStyleSheet.build({  
  $lightbackground: '#F5FCFF',
  $fullblack: '#000',
  $primaryBlue: '#4F6D7A',
  $white: '#fff',
  $border: '#e2e2e2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  // $outline: 1
});

const middlewares = [ReduxThunk, reduxMiddleware];

class App extends React.Component {
  componentWillMount() {
     // Initialize Firebase
      const config = {
      apiKey: configs.apiKey,
      authDomain: configs.authDomain,
      databaseURL: configs.databaseURL,
      projectId: configs.projectId,
      storageBucket: configs.storageBucket,
      messagingSenderId: configs.messagingSenderId
    };
    firebase.initializeApp(config);
  }
  render() {     
    const store = createStore(reducers, {}, applyMiddleware(...middlewares));
    return (          
      <Provider store={store}>  
        <AppNavigation />    
      </Provider>  
    );
  }    
}


export default App;
