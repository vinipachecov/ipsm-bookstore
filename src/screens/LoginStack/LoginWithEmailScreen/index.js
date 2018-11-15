import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Image, Text, ActivityIndicator } from 'react-native';
import { Header, Right, Icon, Left, Button, Container } from 'native-base';
import { TextField } from '../../../components/common/TextField';


//actions
// custom components
import { SignInUser, clearErrorMessageOnType } from '../../../Actions/LoginActions';
import { sendInitialRoute } from '../../../Actions/NavigationActions';
import { Spinner } from '../../../components/common/Spinner/index';
import { ErrorBox } from '../../../components/common/ErrorBox/index';

import styles from './styles';
import { NavigationService } from '../../../Navigation';


class LoginWithEmailScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = { email: '', password: '' };
  } 

  componentDidMount() {
    const { navigation } = this.props;
    this.props.sendInitialRoute(navigation.state.key);
  }

  // Screen data functions
  onEmailChange = (text) => {          
    this.setState({ email: text });
  }

  onPaswordChange = (password) => {        
    this.setState({ password });
  }

  /**
   * attempts to sign in with the user credentials
   * to firebase
   */  
  SignIn = () => {         
    const { email, password } = this.state;        

    this.props.SignInUser({ email, password });    
  }  

  //Navigation

  navigateToForgotPassword = () => {
    NavigationService.navigate('forgotPassword');
  }

  renderErrorBox = (error) => {
    if (error !== '' && error !== undefined) {
      // console.log(error);
      return <ErrorBox errors={error} />;
    }
  }

  navigateBack = () => {
    NavigationService.navigateBack();
  }

  render() {                    
    return (          
      <Container>
      <KeyboardAvoidingView behavior='position' style={{ backgroundColor: 'white', flex: 1 }}>
        <Header 
          style={{ backgroundColor: 'white' }}
          androidStatusBarColor={'black'}
        >
          <Left>
            <Button               
              transparent
              dark
              onPress={this.navigateBack}
            >
              <Icon 
                name={'arrow-left'}
                type={'Feather'}
              />
            </Button>            
          </Left>          
          <Right />
        </Header>                

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
          <Button             
            full
            transparent
            dark
            onPress={this.navigateToForgotPassword}
          >
            <Text 
              style={styles.forgotPasswordText}              
            >
              Esqueci Minha Senha
            </Text>
          </Button>          
          </View>            
            
            { this.renderErrorBox(this.props.error) }        

           <Button
            full            
            style={{ backgroundColor: '#0D5131', height: 40, marginHorizontal: 20, marginTop: 20 }}
            onPress={this.SignIn}   

           >
            {
              !this.props.loading ?
             <Text style={styles.signInButtonText}>
               Entrar
             </Text>
             :
             <ActivityIndicator color={'white'} size={'large'} />
            }
           </Button>
      </KeyboardAvoidingView>         
      </Container>             
    );
  }
}

const mapStateToProps = (state) => ({          
    loading: state.userData.loading,
    error: state.userData.error    
});

const mapDispatchToProps = {
  SignInUser,  
  clearErrorMessageOnType,  
  sendInitialRoute
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmailScreen);
