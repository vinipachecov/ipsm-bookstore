import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row', 
    height: 55,            
  },
  productData: { 
    marginLeft: 10,    
    flex: 1,
    alignItems: 'flex-start',
  },
  productName: {    
    fontWeight: 'bold',    
  },
  total: {
    fontWeight: 'bold',
  },
  productSaleData: {    
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end' 
  },
  productPrice: {
    marginTop: 5,
  }
});

export default styles;
