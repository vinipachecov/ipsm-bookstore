import React, { Component } from 'react';
import { Text, Image, View, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { Container } from '../../../components/common/Container';
import { ListSeparator, BookCard } from '../../../components/common/List';
import * as _ from 'lodash';

import styles from './styles';

import { navigateToScreen, navigationBack } from '../../../Actions/Navigation';

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
    bookname: 'Maravilhosas Doutrinas da Graça',
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
  },
  {
    bookname: 'Paixão pela Verdade',
    SSID: '154653'    
  },    
  {
    bookname: 'É possível confiar na Bíblia?',
    SSID: '154653'    
  }    
];
class HomeScreen extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
      bookSearchList: [],
      searchText: ''
    };
  }

  goToBookScreen = () => {
    this.props.navigateToScreen('bookScreen');
  }

  componentWillMount() {
    const array = this.createProductSearchList(fakelist);    
    this.setState({ bookSearchList: array });    
  }
  
  createProductSearchList = (bookList) => {  
    const array = fakelist.map(item => {
      return { name: item.bookname, SSID: item.SSID };
    });    
    return array;
  };

  getFilteredArray = (array) => {    
    array = _.sortBy(this.state.bookSearchList, book => book.name);    
    array = _.filter(array, (val) => {            
      return val.name.startsWith(this.state.searchText);
    });          
    return array;          
  };  


  render() {
    return (
      <Container>   

      <View style={styles.headerSyle}>        
          <Icon 
            name={'menu'}
            type={'feather'}               
            onPress={this.props.navigationBack}       
            size={20} 
            containerStyle={{ marginRight: 10 }}           
          />                     
        <Icon 
          name={'search'}
          type={'evilicons'}
          size={25} 
          containerStyle={{ marginRight: 10 }}           
        />        
        <View style={{ width: '70%', height: 40 }}>
          <TextInput 
            style={{              
              fontSize: 15,
              backgroundColor: 'lightgray'              
            }}            
            onChangeText={ text => this.setState({ searchText: text})}        
            placeholder={'Nome de um livro..'}
          />
        </View>
      </View>  

       <View 
       style={styles.bookList}>
        <FlatList 
          data={this.getFilteredArray(fakelist)}
          keyExtractor={item => item}
          renderItem={({item}) => {            
              return (
              <BookCard 
                book={item}    
                onPress={this.goToBookScreen}            
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
  navigateToScreen,
  navigationBack  
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

