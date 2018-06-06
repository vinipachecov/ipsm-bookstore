import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';


const styles = EStyleSheet.create({
  container: {        
    marginTop: 60,
  },
  buttonLogin: {    
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',    
  },
  buttonVisitant: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%'    
  },
  textStyle: {
    color: '#000000'
  }
});

export default styles;
