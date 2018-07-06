import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import { Container } from '../../../components/common/Container/index';
import { Title } from '../../../components/common/Title';
import { TextField } from '../../../components/common/TextField';
import { Spinner } from '../../../components/common/Spinner';
import { ErrorBox } from '../../../components/common/ErrorBox';
import { NavBar } from '../../../components/common/NavBar';
import { IconText } from '../../../components/common/IconText';

// Actions
import { navigationBack } from '../../../Actions/Navigation';
import { registerUser } from '../../../Actions/RegisterActions';
import {   
  onEmailChange, 
  onPasswordChange, 
  onPasswordConfirmChange 
} from '../../../Actions/FormActions';

class CreateAccountWithEmail extends Component {    

  constructor(props) {
    super(props);
    
    this.inputs = {};
  }    

  setRef = (input, ref) => {
    this.inputs[ref] = input;    
  }

  registerNewUser = () => {
    const { email, password, passwordConfirm } = this.props;       
    this.props.registerUser(email, password, passwordConfirm);
  }

  focusNextField = (key) => {
    this.inputs[key].focus();
  }  

  renderSpinner = (loading) => {
    if (loading) {
      return <Spinner />;    
    }  
  }

  renderErrorBox = (error) => {
    if (error !== '') {
      console.log(error);
      return <ErrorBox errors={error} />;
    }
  }

  render() {           
    // TEMPORÁRIO ATÉ SURGIR A TELA DE LOGIN    
    return (      
      <Container>     
        <KeyboardAwareScrollView 
          keyboardDismissMode='none' 
          keyboardShouldPersistTaps={'always'} 
        >        
        <NavBar 
          backgroundColor='white'
          headerLeft={
            <IconText
              iconName={'arrow-left'}
              type={'material-community'}                 
              onPress={this.props.navigationBack}
            />             
          }                            
        />               
        <Title text='Cadastre-se' />                                   
       
        <TextField             
          refKey={'main'}
          setRef={this.setRef}            
          value={this.props.email}        
          label={'Email'}
          onChangeText={this.props.onEmailChange}            
          returnKeyType="next"
          onSubmitEditing={() => {
            // specify the key of the ref, as done in the previous section.
            this.focusNextField('password');
          }}          
          blurOnSubmit={false}
        />                        

        <TextField            
          setRef={this.setRef}              
          refKey={'password'}
          value={this.props.password}
          label={'Senha'}        
          onChangeText={this.props.onPasswordChange}  
          returnKeyType="next"   
          onSubmitEditing={() => {
            // specify the key of the ref, as done in the previous section.
            this.focusNextField('passwordConfirm');
          }}       
          secureTextEntry          
        />                                

        <TextField   
          setRef={this.setRef}              
          refKey={'passwordConfirm'}                                   
          value={this.props.passwordConfirm}
          onChangeText={this.props.onPasswordConfirmChange}
          label={'Confirme sua Senha'}          
          onSubmitEditing={this.registerNewUser}      
          secureTextEntry
        />              
        
        
        { this.renderSpinner(this.props.loading) }  
        { this.renderErrorBox(this.props.error) }               

        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <Button 
            title={'Cadastrar'}
            color={'green'}            
            onPress={this.registerNewUser}                           
          />
        </View>                           
        </KeyboardAwareScrollView>            
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.forms.email,
  password: state.forms.password,
  passwordConfirm: state.forms.passwordConfirm,
  loading: state.forms.loading,
  error: state.forms.error
});

const mapDispatchToProps = {
  registerUser,
  navigationBack,  
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountWithEmail);
