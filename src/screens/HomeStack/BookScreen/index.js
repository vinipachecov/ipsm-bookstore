import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/common/Container/Container';
import NavBar from '../../../components/common/NavBar/NavBar';
import IconText from '../../../components/common/IconText/IconText';

import { navigationBack } from '../../../Actions/Navigation';

import styles from './styles';

class BookScreen extends Component { 
  
  render() {
    return (
      <Container>
        <NavBar 
           headerLeft={
            <IconText 
              iconName={'arrow-left'} 
              type={'feather'}               
              onPress={this.props.navigationBack}                     
            />            
          }
          centerComponent={
            <View style={{ height: 48, justifyContent: 'center', marginRight: 15 }}>
            <Text >Dados do Livro</Text>
            </View>
          }
        />              
        <View style={styles.body}>

          <View style={{flexDirection: 'row' }}>            
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20 }}>
              <Text>
                Nome            
              </Text>
            </View>
              

              <View style={{ width: '50%' }}>
                <Text>
                  Nome do Livro
                </Text>
              </View>        

            </View>            
        

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20 }}>
              <Text>
                Autor            
              </Text>
            </View>            

            <View style={{ width: '50%'}}>
              <Text>
                Nome do Autor
              </Text>
            </View>            
          </View>  


           <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20 }}>
              <Text>
                Unidades disponíveis            
              </Text>
            </View>            

            <View style={{ width: '50%'}}>
              <Text>
                5
              </Text>
            </View>            
          </View>  

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20 }}>
              <Text>
                Preço            
              </Text>
            </View>            

            <View style={{ width: '50%'}}>
              <Text>
                R$ 25,00
              </Text>
            </View>            
          </View>  
          
        </View>      

      </Container>           
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  navigationBack  
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);

