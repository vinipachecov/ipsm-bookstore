import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {    
    height: 30,        
    backgroundColor: 'lightgray',      
    marginTop: 30,    
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 20,
    color: 'gray',
    fontSize: 12,
    alignSelf: 'center',
  }  
});

export default styles;
