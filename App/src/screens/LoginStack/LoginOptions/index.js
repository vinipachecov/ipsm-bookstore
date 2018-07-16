import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

//import { Button } from 'native-base';
import Container from '../../../components/common/Container/Container';

import styles from './styles';

//actions
import { alreadySignedIn, signInAsGuest } from '../../../Actions/LoginActions';
import { navigateToScreen } from '../../../Actions/Navigation';
import { Spinner } from '../../../components/common/Spinner';


class LoginOptionsScreen extends Component { 
  state = {
    alreadyLoggedIn: false
  } 

  componentDidMount() {        
    firebase.auth().onAuthStateChanged(user => {
      if (user) {            
        console.log('usuario logado'); 
        this.setState({ alreadyLoggedIn: true });
        this.props.alreadySignedIn(user);                              
      } else {
        firebase.auth().signOut();
      }             
    }); 
  }

  navigateTo = (route) => {
    this.props.navigateToScreen(route);
  }

  guestSignIn = () => {
    this.props.signInAsGuest();
  }

  renderLoginMessage = () => {
    const { alreadyLoggedIn } = this.state;
    if (alreadyLoggedIn) {
      return (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text>Restaurando sessão anterior...</Text>
          <Spinner />
        </View>
      );
    }
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
          <Text style={{ marginHorizontal: 10, fontSize: 25, color: '#000000', fontWeight: '200' }}>Livraria  da IPSM</Text>
          
        </View>        
        <View style={styles.container}>
          <Button 
            title={'Entrar com Conta'}
            buttonStyle={styles.buttonLogin}            
            onPress={() => this.navigateTo('loginWithEmail')}
            textStyle={styles.textStyle}
          />

          <Button 
            title={'Entrar como Visitante'}            
            buttonStyle={styles.buttonVisitant}      
            onPress={this.guestSignIn}                  
            textStyle={{ color: '#000000'}}
          />         
          </View>      
          { this.renderLoginMessage()}
      </Container>  
    );
  };
};

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  navigateToScreen,
  alreadySignedIn,
  signInAsGuest  
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionsScreen);
