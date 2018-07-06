import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';

import styles from './styles';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(book)}>
      <View style={styles.ListItemContainer}>
        <Text style={{ fontSize: 12}}>{book.name}</Text>
      </View>
    </TouchableNativeFeedback>
    
  )
};

export default BookCard;
