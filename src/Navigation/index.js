import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener, createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import { ActionCreators } from '../Actions'; 

import AppNavigator from './RootNavigator';


export const reduxMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const addListener = createReduxBoundAddListener('root');

class AppNavigation extends React.Component {
  render() {
    const { navigation, dispatch } = this.props;    
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigation,
          addListener
        })}
      />      
    );
  }
}    


const bindAction = dispatch => {
  return Object.assign({ dispatch }, bindActionCreators(ActionCreators, dispatch)); 
  // // add dispatch itself to props, so available for addNavigationHelpers  
};

const mapStateToProps = state => ({
  navigation: state.navigation
});  

export default connect(mapStateToProps, bindAction)(AppNavigation);
