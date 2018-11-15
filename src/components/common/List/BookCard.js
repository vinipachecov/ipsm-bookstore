import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { TextMask, TextAdapter } from 'react-text-mask-hoc/ReactNative';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import styles from './styles';
import { BRL } from '../../../helpers';

const dollarMask = createNumberMask({
  prefix: 'R$ ',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 10,
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 3,
  });

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={() => onPress(book)}>
      <View style={styles.ListItemContainer}>
        <Text style={{ fontSize: 12, color: '#0066c0', marginTop: 10 }}>{book.name}</Text>
        <Text style={{ fontSize: 8 }}>por: {book.author}</Text>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>        
        {
          book.unitPrice ?           
          <TextMask               
            placeholder={'Quantidade em estoque'}
            Component={TextAdapter}
            value={parseFloat(book.unitPrice).toFixed(2).replace('.', ',') || 0}
            mask={dollarMask}                
            style={{ 
              paddingVertical: 0,
              marginVertical: 0, 
              fontSize: 14, 
              color: '#B12704'
            }}                                                     
          />
          :
          <Text style={{ fontSize: 10 }}>Preço indefindo.</Text>
          
        }       
        </View>        
      </View>
    </TouchableNativeFeedback>
    
  )
};

export default BookCard;
