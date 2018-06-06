import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import styles from './styles';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.ListItemContainer}>
        <Text>{book.name}</Text>
      </View>
    </TouchableNativeFeedback>
    
  )
};

export default BookCard;
