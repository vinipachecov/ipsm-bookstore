import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../../../components/common/Container';
import { Title } from '../../../components/common/Title';

//Actions
import { recoverPassword } from '../../../Actions/PasswordRecoverActions';
import { navigationBack } from '../../../Actions/Navigation';

import { NavBar } from '../../../components/common/NavBar';
import { IconText } from '../../../components/common/IconText';
import { TextField } from '../../../components/common/TextField';
import { Spinner } from '../../../components/common/Spinner';
import { ErrorBox } from '../../../components/common/ErrorBox';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    
    this.state = { email: '' };
  }

  onEmailChange = (text) => {    
    this.setState({ email: text, error: '' });
    } 

  recoverPassword = () => {
    console.log(`recovering password with email ${this.state.email}`);
    const email = this.state.email;
    this.props.recoverPassword({ email });        
  }


  renderSpinner = (loading) => {
    if (loading) {
      return <Spinner />;
    }
  }

  renderErrorBox(error) {
    if (error !== '') {
      return <ErrorBox errors={error} />;
    }
  }
  render() {           
    return (            
      <Container>         
        <KeyboardAvoidingView behavior="position" >
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
        <Title 
          text='Esqueceu sua senha?' 
          subtitle='Insira seu email para encontrar sua conta.'
        />
        <TextField 
          value={this.state.email}
          onChangeText={this.onEmailChange}
          label={'EMAIL'}            
          keyboardType={'email-address'}            
        />     
        { this.renderSpinner(this.props.loading) }
        { this.renderErrorBox(this.props.error) }       
        
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <Button 
            title={'Entrar'}            
            color={'green'}   
            onPress={this.recoverPassword}                 
          />       
        </View>
        </KeyboardAvoidingView>
      </Container>                  
      
    );
  }
}

const mapStateToProps = (state) => ({  
  error: state.forgotPassword.error,
  loading: state.forgotPassword.loading,
  success: state.forgotPassword.success
});

const mapDispatchToProps = {  
  recoverPassword,    
  navigationBack,  
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
