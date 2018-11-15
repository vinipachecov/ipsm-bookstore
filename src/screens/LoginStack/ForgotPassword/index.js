import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Container, Header, Left, Icon, Right, H1 } from 'native-base';
import { connect } from 'react-redux';

//Actions
import { recoverPassword } from '../../../Actions/PasswordRecoverActions';
import { navigationBack } from '../../../Actions/Navigation';

import { TextField } from '../../../components/common/TextField';
import { Spinner } from '../../../components/common/Spinner';
import { ErrorBox } from '../../../components/common/ErrorBox';
import { NavigationService } from '../../../Navigation';


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    
    this.state = { email: '' };
  }
  
  onEmailChange = (text) => {    
    this.setState({ email: text, error: '' });
  } 


  // Send email to redux to handle requests for recovering email
  recoverPassword = () => {
    //console.log(`recovering password with email ${this.state.email}`);
    const email = this.state.email;
    this.props.recoverPassword({ email });        
  }

  // render spinner when doing tuff processing
  renderSpinner = (loading) => {
    if (loading) {
      return <Spinner />;
    }
  }

  // Error messages rendering
  renderErrorBox(error) {
    if (error !== '') {
      return <ErrorBox errors={error} />;
    }
  }

  

  render() {           
    return (            
      <Container>         
        <Header style={{ elevation: 0, backgroundColor: 'white' }}
          androidStatusBarColor={'black'}
        >
          <Left>
            <Button
              transparent
              dark
              onPress={() => NavigationService.navigateBack()}
            >              
              <Icon
                name='arrow-back'
              />
            </Button>
          </Left>
          <Right />

        </Header>        
        
        <H1 style={{ color: 'gray', marginVertical: 20, marginLeft: 20 }}>Esqueceu sua senha?</H1>
        <Text style={{ color: 'gray', marginVertical: 20, marginLeft: 20 }}>Insira seu email para encontrar sua conta.</Text>        
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
            full
            style={{ backgroundColor: '#0D5131' }}
            onPress={this.recoverPassword}
          >
            <Text style={{ color: 'white' }}>Recuperar senha</Text>
          </Button>          
        </View>        
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
