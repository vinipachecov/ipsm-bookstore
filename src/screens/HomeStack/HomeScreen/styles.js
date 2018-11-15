import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
  },
  headerSyle: {
     flexDirection: 'row',     
     justifyContent: 'center',
     backgroundColor: 'white', 
  },
  booklistButton: {    
    marginTop: 30,
    backgroundColor: '#5cb4ed',    
  },
  bookList: {
    marginTop: 30
  }
});

export default styles;
