import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/common/Container/Container';
import NavBar from '../../../components/common/NavBar/NavBar';
import IconText from '../../../components/common/IconText/IconText';
import { ListSeparator, ListItem } from '../../../components/common/List';

import { navigationBack } from '../../../Actions/Navigation';


const fakelist = [
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Senhor dos Anéis',
    SSID: '74256'    
  },
  {
    bookname: '1964 o Elo Perdido',
    SSID: '132765'    
  },
  {
    bookname: 'Cristianismo Puro e Simples',
    SSID: '925761'    
  },
  {
    bookname: 'Verdade Absoluta',
    SSID: '153759'    
  },
  {
    bookname: 'Cartas de um Diabo ao seu aprendiz',
    SSID: '154653'    
  }
];

class BookListScreen extends Component {  

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
            <View style={{ height: 48, justifyContent: 'center', marginRight: 10 }}>
            <Text >Lista de Livros</Text>
            </View>
          }
        />        
        <View>
        <FlatList 
          data={fakelist}
          keyExtractor={item => item.bookname}
          renderItem={({item}) => {            
              return (
              <ListItem 
                book={item}
              />
            );
            }            
          }
          ItemSeparatorComponent={ListSeparator}
        />    
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

export default connect(mapStateToProps, mapDispatchToProps)(BookListScreen);

