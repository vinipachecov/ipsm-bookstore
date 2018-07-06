import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import styles from './styles';

const ButtonIcon = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onPressButton()} >
    <Icon 
      name={"chevron-right"}
      size={50} 
      color="#FFF" 
    />
  </TouchableOpacity>    
 );

export default ButtonIcon;
