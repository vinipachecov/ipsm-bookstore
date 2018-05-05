import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
// import { Button } from 'react-native-elements';
import { Button } from 'native-base';
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
        <View style={{ alignItems: 'center' }}>
          <Image 
            source={require('../../../imagens/logoPresbiteriana.png')} 
            style={{ height: 160, width: 160 }}
            resizeMethod={'resize'}
            resizeMode={'contain'}
          />    
        </View>    
        <View style={{ alignItems: 'center'}}>
          <Text style={{ marginHorizontal: 20, fontSize: 25, color: '#000000', fontWeight: '200' }}>Bem Vindo a</Text>
          <Text style={{ marginHorizontal: 10, fontSize: 25, color: '#000000', fontWeight: '200' }}>Livraria  da IPBSM</Text>
          
        </View>        
        <View style={styles.container}>
          {/* <Button 
            title={'Entrar com Conta'}
            buttonStyle={styles.buttonLogin}            
            onPress={() => this.navigateTo('loginWithEmail')}
          />

          <Button 
            title={'Entrar como Visitante'}            
            buttonStyle={styles.buttonVisitant}                        
          /> */}

          <Button 
            color={'green'}
          />
          <Text onPress={() => this.navigateTo('createAccount')}>Fazer Cadastro</Text>  
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
