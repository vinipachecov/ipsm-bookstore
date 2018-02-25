import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {           
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',    
    marginHorizontal: 20,    
    marginTop: 5,
    
  },
  textStyle: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,     
  }
});

export default styles;
