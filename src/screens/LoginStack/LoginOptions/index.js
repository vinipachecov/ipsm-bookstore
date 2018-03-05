import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Container from '../../../components/common/Container/Container';

import styles from './styles';

//actions
import { navigateToScreen } from '../../../Actions/Navigation';
import { Title } from '../../../components/common/Title/index';


class LoginOptionsScreen extends Component {  

  navigateTo = (route) => {
    this.props.navigateToScreen(route);
  }

  render() {
    return (
      <Container>
        <Title 
         text={'Livraria da IPBSM'}
         subtitle={'Bem vindo ao app de gestão da Livraria.'}
        />        
        <View style={styles.container}>
          <Button 
            title={'Fazer Login'}
            buttonStyle={styles.buttonLogin}            
            onPress={() => this.navigateTo('loginWithEmail')}
          />

          <Button 
            title={'Fazer Cadastro.'}            
            buttonStyle={styles.buttonRegister}
            onPress={() => this.navigateTo('createAccount')}
          />  
          </View>      
      </Container>  
    );
  };
};

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  navigateToScreen
  
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionsScreen);
