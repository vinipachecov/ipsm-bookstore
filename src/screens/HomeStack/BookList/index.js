import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../../components/common/Container/Container';
import NavBar from '../../../components/common/NavBar/NavBar';

const fakelist = [
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  },
  {
    bookname: 'Ídolos do Coração',
    SSID: '123456'    
  }
];

class BookListScreen extends Component {  

  render() {
    return (
      <Container>
        <NavBar />
        <FlatList 
          data={fakelist}
          keyExtractor={item => item}
          renderItem={item => 
            <TouchableOpacity>
              <View>
                <Text>{item.bookname}</Text>
              </View>
            </TouchableOpacity>
          }
        />        
      </Container>           
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListScreen);

