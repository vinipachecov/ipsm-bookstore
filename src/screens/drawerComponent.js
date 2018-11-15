import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { LogOut } from '../Actions/LoginActions';
import { NavigationService } from '../Navigation';
import { Button } from 'native-base';

class drawerComponent extends Component {  

  LogOut = () => {
    const { user } = this.props;             
    if (user !== undefined) {          
        this.props.LogOut();      
        NavigationService.navigate('loginStack');          
        NavigationService.navigate('loginWithEmail');                    
    } else {        
      NavigationService.navigate('loginStack');          
      NavigationService.navigate('loginOptions');                    
    }      
  }

  render() {
    return (
      <View>
        <Button
          transparent
          dark
          onPress={this.LogOut}
          full
        >
          <Text>Sair</Text>
        </Button>        
        <Text>Em breve mais novidades...</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userData.user,
  initialRoute: state.navData.initialRoute  
});

const mapDispatchToProps = {
  LogOut    
};

export default connect(mapStateToProps, mapDispatchToProps)(drawerComponent);
