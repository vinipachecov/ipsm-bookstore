import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

import styles from './styles';

const Spinner = ({ size }) => {
const { spinnerStyle } = styles;

    return (        
      <View>
        <ActivityIndicator 
          style={spinnerStyle}
          size={size || 'large'}
          animating            
          color="#0000ff"
        />        
      </View>      
    );
};


export default Spinner;
