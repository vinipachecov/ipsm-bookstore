import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const MainContent = ({ children }) => {
  return (
    <View style={styles.mainBlock}>
      { children }
    </View>
  );  
};


MainContent.propTypes = {
  children: PropTypes.any,
};

export default MainContent;
