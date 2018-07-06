import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';

import styles from './styles';

class TextField extends PureComponent {

  static propTypes = {
    ...TextInput.propTypes,  
    label: PropTypes.string,  
    setRef: PropTypes.func,
    refKey: PropTypes.string
  }

  constructor(props) {    
    super(props);        
  }  

  render() {    
    const { onChangeText, label, ...props } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 20 }}>
          <Text>{label}</Text>
        </View>
      <View>
      <TextInput           
        onChangeText={text => onChangeText(text)}
        ref={ input => { 
            if (props.setRef !== undefined) {
              //sets the reference of this TextInput on its related view
              props.setRef(
                input, props.refKey === '' || props.refKey === undefined ? '': props.refKey
              );         
            }            
         }}
        style={styles.TextInput}        
        autoCapitalize={'none'}        
        underlineColorAndroid={'transparent'}
        autoCorrect={false}      
        {...props}                     
      />
      </View>
    </View>
    );
  }

}
export default TextField;
