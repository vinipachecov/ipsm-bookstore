import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

const styles = EStyleSheet.create({
  separator: {
    marginLeft: 20,
    backgroundColor: '$border',
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  ListItemContainer: {
    height: 40,
    width: '100%',    
    paddingLeft: 30,
    justifyContent: 'center',    
  }
});

export default styles;
