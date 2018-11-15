import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import configs from './configs/firebaseproduction';

import reducers from './reducers';
import { RootNavigator } from './Navigation';

EStyleSheet.build({    
  $white: '#fff',
  $border: '#e2e2e2',  
  $verdePresbiteriano: '#0D5131'
  // $outline: 1
});

const middlewares = [ReduxThunk];

class App extends React.Component {
  
  componentWillMount() {
     // Initialize Firebase
     if (!firebase.apps.length) {
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
  }  
  
  render() {     
    const store = createStore(reducers, {}, applyMiddleware(...middlewares));
    return (          
      <Provider store={store}>  
        <RootNavigator />    
      </Provider>  
    );
  }    
}


export default App;
