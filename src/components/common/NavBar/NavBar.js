import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';

import styles from './styles';

const NavBar = ({ headerLeft, centerComponent, headerRight, backgroundColor }) => (    
  <Header
    outerContainerStyles={styles.container}
    leftComponent={headerLeft}
    centerComponent={centerComponent}
    rightComponent={headerRight}
    backgroundColor={backgroundColor || 'white'}
  />  
);

NavBar.propTypes = {
  headerLeft: PropTypes.element,
  headerRight: PropTypes.element
};


export default NavBar;
