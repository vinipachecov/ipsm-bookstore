import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import styles from './styles';

const IconText = ({ iconName, type, size, iconColor, onPress, text }) => { 
  return (
    <View style={styles.container} >
      <Icon 
        name={iconName}
        type={type}       
        size={size || 26}   
        color={iconColor}      
        onPress={onPress}
      />
      <Text 
        style={styles.textStyle}
        onPress={onPress}
      >
        {text}
      </Text>
    </View>    
  );
};

IconText.propTypes = {
  iconName: PropTypes.string,
  type: PropTypes.string,
  iconColor: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string
};

export default IconText;
