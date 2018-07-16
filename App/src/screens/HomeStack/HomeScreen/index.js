import React, { Component } from 'react';
import { View, TextInput, FlatList } from 'react-native';

// Sorting functions
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


import { connect } from 'react-redux';

// Components
import { Icon } from 'react-native-elements';
import { Container } from '../../../components/common/Container';
import { ListSeparator, BookCard } from '../../../components/common/List';

import styles from './styles';


class HomeScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      bookSearchList: [],
      searchText: ''
    };
  }
 
  componentDidMount = () => {    
    const { bookList } = this.props;
    const array = this.createProductSearchList(bookList);            
    this.setState({ bookSearchList: array });      
  }

  componentWillReceiveProps(props) {
    console.log('vai receber novos props');
    console.log(props);
    const { bookList } = props;
    console.log('nova lista = ', bookList);
    const array = this.createProductSearchList(bookList);            
    this.setState({ bookSearchList: array });          
  }
 
  onChangeSearchText = (text) => {
    this.setState({ searchText: text });
  }

  createProductSearchList = (bookList) => {      
    const array = bookList.map(item => {
      return { ...item };
    });    
    return array;
  };

  
  goToBookScreen = (book) => {
    const { navigation } = this.props;
    console.log(book);
    navigation.navigate('bookScreen', { book });    
  }

  render() {    
    const { searchText, bookSearchList } = this.state;    
    let showingBooks;
    if (searchText) {
      const match = new RegExp(escapeRegExp(searchText), 'i');
      showingBooks = bookSearchList.filter((book) => match.test(book.name));
    } else {
      showingBooks = bookSearchList;
    }

    showingBooks.sort(sortBy('name'));    
    return (
      <Container>   

      <View style={styles.headerSyle}>        
          <Icon 
            name={'menu'}
            type={'feather'}                           
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
            onChangeText={text => this.onChangeSearchText(text)}        
            placeholder={'Nome de um livro..'}
          />
        </View>      
      </View> 

       <View 
       style={styles.bookList}>
        <FlatList           
          data={showingBooks}
          keyExtractor={item => item.name}
          renderItem={({item}) => {            
              return (
              <BookCard 
                key={item.bookname}
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
  bookList: state.bookData.bookList
});

const mapDispatchToProps = {  
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

