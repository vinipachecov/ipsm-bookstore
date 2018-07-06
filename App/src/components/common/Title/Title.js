import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

// Componente utilizado para os títuls principais das Screens

function renderSomething(subtitle) {
  if (subtitle !== undefined) {
    return <Text style={styles.subtitle}>{ subtitle }</Text>;
  }
}

const Title = ({ text, subtitle }) => (  
  <View>
    <Text style={styles.titleStyle}>{ text }</Text>            
    { renderSomething(subtitle)}
  </View>
);


export default Title;
