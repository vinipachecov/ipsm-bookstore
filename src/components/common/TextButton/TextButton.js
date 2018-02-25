import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

// function onPressButton(text) {
//   console.log(`clicked in the ${text} button!`);
// }

const TextButton = ({ text, extraStyle, onButtonPressed }) => (
  <TouchableOpacity onPress={onButtonPressed}>
    <Text
      style={[styles.textStyle, extraStyle]}      
    >
    { text }
    </Text>
  </TouchableOpacity>
);


TextButton.propTypes = {
  onButtonPressed: PropTypes.func,
  text: PropTypes.string.isRequired,
  extraStyle: PropTypes.object
};

export default TextButton;
