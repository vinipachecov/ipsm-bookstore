import React from 'react';
import { View, Text, TouchableWithoutFeedback  } from 'react-native';

import styles from './styles';

function soldPercentage(total, totalsold) {
  return Math.floor(((total * 100) / totalsold));
}

function hasGrayBackground(key) {  
  if (key % 2 === 1) {
    return { backgroundColor: 'lightgray' };
  }  
}

function formatCurrency(val) {
  return (parseFloat(val)).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

const ProductTextCard = (props) => {
  const { 
    productPrice, 
    productName, 
    productTotalSales,
    unitsSold, 
    totalUnits
  } = props;  

  return (    
    <TouchableWithoutFeedback 
      onPress={props.navigation}      
      activeOpacity={0.1}
    >
      {/* Product data */}
      <View style={[styles.container, hasGrayBackground(props.id)]}>
        <View style={styles.productData}>
          <Text 
            style={styles.productName}
          >
            { productName }
          </Text>
          <Text 
            style={styles.productPrice}
          >
            R$ {
               formatCurrency(productPrice)
            }
          </Text>
        </View>
      {/* Product sales data */}
        <View style={styles.productSaleData}>    
          <Text 
           style={styles.total}
          >
          R$ {
                formatCurrency(productTotalSales)
             }
          </Text>
          <Text 
           style={styles.productPrice}      
          >
          { unitsSold } un. / {soldPercentage(unitsSold, totalUnits)}%
          </Text>
        </View>
        </View>
      </TouchableWithoutFeedback>          
  );
};
ProductTextCard.propTypes = {

};

export default ProductTextCard;
