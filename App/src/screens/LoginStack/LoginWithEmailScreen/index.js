import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TextField } from '../../../components/common/TextField';

//actions
import { navigationBack, navigateToScreen } from '../../../Actions/Navigation';
// custom components
import { Container } from '../../../components/common/Container';
import { SignInUser, clearErrorMessageOnType } from '../../../Actions/LoginActions';
import { Spinner } from '../../../components/common/Spinner/index';
import { ErrorBox } from '../../../components/common/ErrorBox/index';
import { NavBar } from '../../../components/common/NavBar';
import { IconText } from '../../../components/common/IconText';

import styles from './styles';

class LoginWithEmailScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = { email: 'lizzzdmc@gmail.com', password: '123456' };
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
      return <View style={{ marginTop: 10 }}><Spinner /></View>;    
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
        <KeyboardAvoidingView behavior='position'>
         <NavBar 
          backgroundColor='white'     
          headerLeft={
              <IconText 
                iconName={'arrow-left'} 
                type={'feather'}               
                onPress={this.props.navigationBack}                     
              />
          }               
         />         

         <View style={{ alignItems: 'center' }}>
         <Image 
            source={require('../../../imagens/logoPresbiteriana.png')} 
            style={{ height: 120, width: 120 }}
            resizeMethod={'resize'}
            resizeMode={'contain'}
         />    
         </View>         

         <View style={{ marginTop: 10 }}>
          <TextField 
            onFocus={this.props.clearErrorMessageOnType}
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
          <Text 
            style={styles.forgotPasswordText}
            onPress={this.navigateToForgotPassword}
          >
            Esqueci Minha Senha
          </Text>
          </View>            
         
            { this.renderSpinner(this.props.loading) }
            { this.renderErrorBox(this.props.error) }        

           
            <Button 
              title={'Entrar'}
              backgroundColor={'#0D5131'}   
              textStyle={styles.signInButtonText}
              onPress={this.SignIn}   
              containerViewStyle={styles.signInButtonContainer}        
            />   
           
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
