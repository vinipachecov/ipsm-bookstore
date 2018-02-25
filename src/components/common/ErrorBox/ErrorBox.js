import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const componentName = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{ props.errors }</Text>
  </View>
);

export default componentName;
