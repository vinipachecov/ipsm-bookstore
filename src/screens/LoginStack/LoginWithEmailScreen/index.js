import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Button, Text, TextInput } from 'react-native';
import { TextField } from '../../../components/common/TextField';


import { navigationBack, navigateToScreen } from '../../../Actions/Navigation';

import { Container } from '../../../components/common/Container';
import { Title } from '../../../components/common/Title/index';
import { SignInUser, clearErrorMessageOnType } from '../../../Actions/LoginActions';
import { Spinner } from '../../../components/common/Spinner/index';
import { ErrorBox } from '../../../components/common/ErrorBox/index';
import { NavBar } from '../../../components/common/NavBar';
import { IconText } from '../../../components/common/IconText';


class LoginWithEmailScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = { email: '', password: '' };
  } 

  onEmailChange = (text) => {          
    this.setState({ email: text });
  }

  onPaswordChange = (password) => {        
    this.setState({ password });
  }


  SignIn = () => {         
    const { email, password } = this.state;    
    console.log('signing in... ');

    this.props.SignInUser({ email, password });    
  }  

  navigateToForgotPassword = () => {
    this.props.navigateToScreen('forgotPassword');
  }

  navigateToRegisterUser = () => {
    this.props.navigateToScreen('createAccount');
  }

  renderSpinner = (loading) => {
    if (loading) {
      return <Spinner />;    
    }  
  }

  renderErrorBox = (error) => {
    if (error !== '' && error !== undefined) {
      console.log(error);
      return <ErrorBox errors={error} />;
    }
  }

  render() {                    
    return (    
      <Container>                 
         <KeyboardAvoidingView behavior="padding">
         <NavBar 
          backgroundColor='white'     
          headerLeft={
              <IconText 
                iconName={'arrow-left'} 
                type={'feather'}               
                onPress={this.props.navigationBack}                     
              />
          }     
          headerRight={
              <IconText 
                text='Esqueceu sua senha?'       
                onPress={this.navigateToForgotPassword}                     
              />
            }         
         />         
         
        <Title text='Livraria IPBSM' />  

         <View style={{ marginTop: 40 }}>
          <TextField 
            value={this.state.email}
            onChangeText={this.onEmailChange}
            label={'EMAIL'}            
            keyboardType={'email-address'}            
          />     

            
          <TextField 
            value={this.state.password}
            onChangeText={this.onPaswordChange}
            label={'SENHA'}                         
            secureTextEntry
          />     
          </View>            
         
            { this.renderSpinner(this.props.loading) }
            { this.renderErrorBox(this.props.error) }        

            <View style={{ marginHorizontal: 20, marginTop: 30 }}>
            <Button 
              title={'Entrar'}            
              color={'green'}   
              onPress={this.SignIn}                 
            />   

            <Text style={{fontSize: 25, color: 'gray', alignSelf: 'center', marginTop: 30 }}>Não possui Conta?             
              <Text
               style={{fontSize: 25, fontWeight: '800', color: 'gray', }}
               onPress={this.navigateToRegisterUser}
              >
              Criar Conta 
              </Text>
             </Text>
            
            
            </View>          
          </KeyboardAvoidingView>
      </Container>  
      
    );
  }
}

const mapStateToProps = (state) => ({          
    loading: state.loginEmail.loading,
    error: state.loginEmail.error    
});

const mapDispatchToProps = {
  SignInUser,  
  clearErrorMessageOnType,
  navigationBack,
  navigateToScreen
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmailScreen);
