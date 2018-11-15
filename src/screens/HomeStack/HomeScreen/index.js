import React, { Component } from 'react';
import { TextInput, FlatList,  Text } from 'react-native';
import { Container, Icon, Header, Left, Body, Right, Button, Item, Title } from 'native-base';
import ActionButton from 'react-native-action-button';
// Sorting functions
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


import { connect } from 'react-redux';

// Components
import { ListSeparator, BookCard } from '../../../components/common/List';

import styles from './styles';
import { LogOut } from '../../../Actions/LoginActions';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      bookSearchList: [],
      searchText: '',
      refreshing: false,
    };
  }
 
  /**
   * Based on all data gathered create an array 
   * using the original bookList so it can be modified 
   */
 
 
  onChangeSearchText = (text) => {
    this.setState({ searchText: text });
  }

  goToBookScreen = (book) => {
    const { navigation } = this.props;  
    if (book === undefined) {
      //console.log('criando livro');
      navigation.navigate('bookScreen', { book: undefined, newBook: true });    
    }
    navigation.navigate('bookScreen', { book });    
  }  

  openDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {    
    const { searchText } = this.state;    
    const { bookList } = this.props;
    let showingBooks;
    if (searchText) {
      const match = new RegExp(escapeRegExp(searchText), 'i');
      showingBooks = bookList.filter((book) => match.test(book.name) || match.test(book.publisher) || match.test(book.author));
    } else {
      showingBooks = bookList;
    }

    showingBooks.sort(sortBy('name'));    
    return (
      <Container style={styles.containerStyle}>  
       
       <Header 
        style={{ backgroundColor: 'white' }}
        androidStatusBarColor={'black'}
       >        
        <Left>
          <Button 
            dark 
            transparent         
          >
            <Icon 
              name={'menu'}
              type={'MaterialCommunityIcons'}
              onPress={this.openDrawer}
            />            
          </Button>
        </Left>
        <Body>     
          <Title style={{ color: 'black' }}>Início</Title>          
        </Body>  
        <Right />                  
        </Header>
        <Header searchBar rounded style={{ backgroundColor: 'white' }}
          androidStatusBarColor={'black'}
        >              
          <Item>           
          <TextInput 
            value={searchText}
              style={{              
                fontSize: 15,
                backgroundColor: 'white',
                width: '100%',         
              }}            
              onChangeText={text => this.onChangeSearchText(text)}        
              placeholder={'Busque um livro..'}
              underlineColorAndroid={'black'}
            />            
          </Item>          
        </Header>              
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
        { this.props.user ?
           <ActionButton             
           buttonColor="#0D5131" 
           elevation={1}      
           size={50}       
           onPress={this.goToBookScreen}
          >        
          </ActionButton>         
       :  
       null
        }
      </Container>      
    );
  }
}

const mapStateToProps = (state) => ({
  bookList: state.bookData.bookList,  
  user: state.userData.user,
  initialRoute: state.navData.initialRoute
});

const mapDispatchToProps = {    
  LogOut  
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

