import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';

const LargeButton = props => (
  <View style={[styles.container, props.containerStyle]}>
    <Button 
      text={props.title}
      buttonStyle={props.buttonStyle}
      onPress={props.onButtonPress}   
      textStyle={props.textStyle}
    />
  </View>
);

export default LargeButton;
