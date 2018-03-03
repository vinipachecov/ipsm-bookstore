import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Container } from '../../../components/common/Container';
import { NavBar } from '../../../components/common/NavBar';
import { Button } from 'react-native-elements';

import { navigateToScreen } from '../../../Actions/Navigation';


class HomeScreen extends Component {
  static propTypes = {
    prop: PropTypes
  };

  goToBookList = () => {
    this.props.navigateToScreen('bookList');
  }

  render() {
    return (
      <Container>
        <NavBar />        
        <Button 
          color={'transparent'}
          title={'Lista de dados'}  
        />

      </Container>      
    )
  };
};

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  navigateToScreen  
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

