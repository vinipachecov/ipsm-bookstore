import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../Actions'; 
import AppNavigator from './Routes';
import NavigationService from './NavigationService';


class AppNavigation extends React.Component {
  render() {    
    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}        
      />      
    );
  }
}    
const bindAction = dispatch => {
  return Object.assign({ dispatch }, bindActionCreators(ActionCreators, dispatch)); 
  // // add dispatch itself to props, so available for addNavigationHelpers  
};

const mapStateToProps = state => ({  
});  

export default connect(mapStateToProps, bindAction)(AppNavigation);
