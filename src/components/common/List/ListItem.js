import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import styles from './styles';

const ListItem = ({ book, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.ListItemContainer}>
        <Text>{book.bookname}</Text>
      </View>
    </TouchableNativeFeedback>
    
  )
};

export default ListItem;
