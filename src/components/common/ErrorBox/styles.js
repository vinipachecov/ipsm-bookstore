import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {    
    height: 60,        
    backgroundColor: 'lightgray',      
    marginTop: 30,    
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 20,
    color: 'gray',
    fontSize: 18,
    alignSelf: 'center',
  }  
});

export default styles;
