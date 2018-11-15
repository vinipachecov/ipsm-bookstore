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
import { Spinner } from '../../../components/common/Spinner';
import NavigationService from '../../../Navigation/NavigationService';
import { sendInitialRoute } from '../../../Actions/NavigationActions';
import { Header } from 'native-base';


class LoginOptionsScreen extends Component { 
  state = {
    alreadyLoggedIn: false
  } 

  componentDidMount() {            
    // Check if user is signed in and 
    //console.log('abrindo app');
    const { navigation } = this.props;
    this.props.sendInitialRoute(navigation.state.key);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {                      
        this.setState({ alreadyLoggedIn: true });
        console.log('usuario logado');
        this.props.alreadySignedIn(user);     
        this.setState({ alreadyLoggedIn: false });
      } else {        
        firebase.auth().signOut();
      }             
    }); 
  }
  
  navigateTo = (route) => {
    NavigationService.navigate(route);    
  }

  // Use login action to login as a Guest (cannot modify data)
  guestSignIn = () => {        
    this.props.signInAsGuest();
  }

  /**
   * Based on previous login or guest login, render a standard message to the user
   */
  renderLoginMessage = () => {
    const { alreadyLoggedIn } = this.state;
    const { loading } = this.props;
    if (alreadyLoggedIn) {
      console.log('entrnado como usuario logado');
      return (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text>Restaurando sessão anterior...</Text>
          <Spinner />
        </View>
      );
    }
    if (loading) {
      return (
        <View style={{ marginTop: 20 }}>
          <Spinner />
        </View>        
      );
    }
  }

  render() {
    return (
      <Container>
        <Header 
          style={{ elevation: 0, backgroundColor: 'white' }}
          androidStatusBarColor={'black'}
        />
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
  loading: state.userData.loading  
});

const mapDispatchToProps = {  
  alreadySignedIn,
  signInAsGuest,
  sendInitialRoute  
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginOptionsScreen);
