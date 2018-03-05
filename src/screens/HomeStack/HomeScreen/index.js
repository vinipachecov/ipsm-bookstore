import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../../../components/common/Container';
import { NavBar } from '../../../components/common/NavBar';
import { Button } from 'react-native-elements';

import styles from './styles';

import { navigateToScreen, navigationBack } from '../../../Actions/Navigation';
import { IconText } from '../../../components/common/IconText';
import Title from '../../../components/common/Title/Title';

class HomeScreen extends Component {

  goToBookList = () => {
    this.props.navigateToScreen('bookList');
  }

  render() {
    return (
      <Container>        
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
      <Title 
          text={'Bem vindo de Volta!'}
      />          
      <Button           
        title={'Lista de Livros'}  
        buttonStyle={styles.booklistButton}
        onPress={this.goToBookList}

      />
      </Container>      
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  navigateToScreen,
  navigationBack  
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

