import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Icon, Right, Left, Body, Container } from 'native-base';
import { TextMask, TextInputAdapter, TextAdapter } from 'react-text-mask-hoc/ReactNative';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';



import { navigationBack } from '../../../Actions/Navigation';
import { updateBook, createBook, deleteBook } from '../../../Actions/BookActions';

import styles from './styles';
import { Spinner } from '../../../components/common/Spinner';
import { NavigationService } from '../../../Navigation';

// currency mask
const dollarMask = createNumberMask({
  prefix: 'R$ ',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 10,
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
});

// quantity mask
const decimalMask = createNumberMask({
  prefix: '',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 10,
  allowDecimal: true,
  decimalSymbol: '',
  decimalLimit: 0,
});

class BookScreen extends Component { 
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const { book } = navigation.state.params;        
    if (book !== undefined) {
      this.state = {
        book,      
        price: book.unitPrice !== undefined && book.unitPrice !== null && book.unitPrice !== '' 
        ? 
        book.unitPrice.replace('.', ',') : 0.0,
        name: book.name,
        author: book.author,
        quantity: book.quantity,
        newBook: false     
      };      
    } else {      
      this.state = {
        book: '',
        name: '',
        author: '',
        quantity: '',
        newBook: true      
      };
    }    
  }

  // Screen data change functions
  onAuthorNameChange = (text) => {
    this.setState({ author: text });
  }

  onQuantityChange = (event) => {
    this.setState({ quantity: event.text });
  }

  onPriceChange = (event) => {
    this.setState({ price: event.text });    
  }

  onNameChange = (text) => {
    this.setState({ name: text });
  }

  /**
   * Render the price differently if the user is a guest or a signed user
   */
  onVisitorPriceRender = (price) => {
    if (price !== undefined && price !== null && price !== '' && price !== 0) {
      return (
        <TextMask
          Component={TextAdapter}
          value={price}            
          mask={dollarMask}                                    
          guide                
        />                  
      );
    }
    return (
      <Text>Valor a ser estabelecido!</Text>
    );              
  }

  /**
   * Gather the screen data and send it to redux to handle the async requests
   * to update the book data on firebase
   */
 
  onDeleteBook = async () => {
    const { book } = this.state;    
    await this.props.deleteBook(book.id);
    this.navigateBack();
  }

  sendUpdatedBookData = async () => {    
    const { name, quantity, price, book, author } = this.state;        
    const updatedBook = {
      name,
      quantity, 
      unitPrice: price !== '' ? price.replace('.', '').replace(',', '.').replace('R$', '').replace(' ', '') : 0.0,
      author,      
    };
    await this.props.updateBook(updatedBook, book.id);    
    this.navigateBack();
  }

  createNewBook = async () => {
    const { name, quantity, price, author } = this.state;        
    const newBook = {
      name,
      quantity, 
      unitPrice: price !== '' ? price.replace(',', '.').replace('R$', '').replace(' ', '') : 0.0,
      author,      
    };
    await this.props.createBook(newBook);              
    this.navigateBack();
  }


  navigateBack = () => {
    NavigationService.navigateBack();
  }


  renderUpdateButton = () => {            
    if (this.props.user !== undefined && this.props.user !== null) {
      const { newBook } = this.state;
      return (
        <View style={{ width: '100%' }}>
        <Button 
          full 
          style={styles.buttonUpdateStyle}
          onPress={() => {
            if (newBook) {
              this.createNewBook();
            } else {
              this.sendUpdatedBookData();
            }
          }}
        >
          <Text style={styles.buttonTextStyle}> {
            newBook ?
            'Criar Novo Livro'
            :
            'Atualizar Dados'            
            }</Text>
        </Button>        
        {
          !newBook ? 
          <Button
            full
            style={{ backgroundColor: 'red', marginHorizontal: 20, marginTop: 20 }}
            onPress={this.onDeleteBook}
          >
            <Text style={styles.buttonTextStyle}>
              Deletar Livro
            </Text>
          </Button>
          :
          null
        }
        </View>
      );
    }
  }   
  


  // Render the spinner the screen is uploading data
  renderSpinner = (loading) => {
    if (loading) {
      return (
        <View style={{ marginTop: 20 }}>
          <Spinner />
        </View>
      );
    }
  }

  render() {    
    const { book, name, price, newBook, author } = this.state;
    const { user, loading } = this.props;    
    return (
      <Container>        
        <Header 
          style={{ backgroundColor: 'white' }}
          androidStatusBarColor={'black'}
        >
          <Left>
            <Button 
              onPress={this.navigateBack}                     
              transparent
              dark
            >
              <Icon 
                name={'arrow-left'}
                type={'Feather'}
              />
            </Button>            
          </Left>
          <Body>
          <Text >{
              newBook ?
              'Novo Livro'
              :
              'Dados do Livro'
              }</Text>
          </Body>
          <Right />
        </Header>       
        <View style={styles.body}>

          <View style={{ flexDirection: 'row' }}>            
            <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20 }}>
              <Text>
                Nome:            
              </Text>
            </View>              

              <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center'}} >
              {
                user ?
                <TextInput
                  value={name}                    
                  placeholder={'Nome do Livro'}                
                  onChangeText={this.onNameChange}
                  style={{ marginBottom: 0, fontSize: 12, paddingBottom: 5, width: '100%' }}
                />
                :
                <Text>
                  {book.name}
                </Text>
              }                
              </View>        

            </View>            
        

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20 }}>
              <Text>
                Autor:            
              </Text>
            </View>            

            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
            {
                user ?
                <TextInput
                  value={author}                    
                  placeholder={'Nome do Autor'}                
                  onChangeText={this.onAuthorNameChange}
                  style={{ marginBottom: 0, fontSize: 12, paddingBottom: 5, width: '100%' }}
                />
                :
                <Text>
                  {book.author}
                </Text>
              }            
            </View>            
          </View>  


           <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
              <Text>
                Unidades disponíveis:            
              </Text>
            </View>            

            <View style={{ width: '50%', justifyContent: 'center', }}>
            { user ? 
            
            // <Text>Texto</Text>
              <TextMask               
                placeholder={'Quantidade em estoque'}
                Component={TextInputAdapter}
                value={this.state.quantity}
                mask={decimalMask}
                onChange={this.onQuantityChange}
                style={{ paddingVertical: 0, marginVertical: 0, fontSize: 12, width: '100%' }}                
                keyboardType={'numeric'}     
                autoCorrect={false}
              />
              :
              <Text>
                {book.quantity}
              </Text>
            }              
            </View>            
          </View>  

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
              <Text>
                Preço            
              </Text>
            </View>            
            <View style={{ width: '50%' }}>
              {
                user ? 
                <TextMask
                  placeholder={'Preço do Livro'}
                  Component={TextInputAdapter}
                  value={price}
                  mask={dollarMask}
                  onChange={this.onPriceChange}
                  style={{ paddingVertical: 0, marginVertical: 0, fontSize: 12, margin: 0 }}
                  guide
                  keyboardType={'numeric'}     
                  autoCorrect={false}
                />
              :
              this.onVisitorPriceRender(price)
                
              }                            
            </View>            
          </View>  
          {this.renderUpdateButton()}        
          {this.renderSpinner(loading)}        
        </View>              
      </Container>           
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userData.user,
  loading: state.forms.loading
});

const mapDispatchToProps = {
  navigationBack,
  updateBook,
  createBook,
  deleteBook  
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);

