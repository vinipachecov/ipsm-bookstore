import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { TextMask, TextInputAdapter, TextAdapter } from 'react-text-mask-hoc/ReactNative';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import Container from '../../../components/common/Container/Container';
import NavBar from '../../../components/common/NavBar/NavBar';
import IconText from '../../../components/common/IconText/IconText';

import { navigationBack } from '../../../Actions/Navigation';
import { updateBook } from '../../../Actions/FirebaseActions';

import styles from './styles';
import { Spinner } from '../../../components/common/Spinner';

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
    this.state = {
      book,      
      price: book.unitPrice !== undefined && book.unitPrice !== null && book.unitPrice !== '' ? parseFloat(book.unitPrice.trim()) : 0.0,
      name: book.name,
      quantity: book.quantity      
    };
  }

  // Screen data change functions
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
    if (price !== undefined && price !== null && price !== '' && price !== 0 ) {
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
  sendUpdatedBookData = async () => {    
    const { name, quantity, price, book } = this.state;
    const { navigation } = this.props;
    const updatedBook = {
      name,
      quantity, 
      unitPrice: price.replace(',', '.').replace('R$', '').replace(' ', ''),
      author: book.author,      
    };
    await this.props.updateBook(updatedBook, book.id);    
    navigation.goBack();
  }

  renderUpdateButton = () => {        
    if (this.props.user !== undefined && this.props.user !== null) {
      return (
        <Button 
          full 
          style={styles.buttonUpdateStyle}
          onPress={() => this.sendUpdatedBookData()}
        >
          <Text style={styles.buttonTextStyle}> Atualizar Dados</Text>
        </Button>
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
    const { book, name, price } = this.state;
    const { user, loading } = this.props;    
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
            <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20 }}>
              <Text>
                Nome            
              </Text>
            </View>              

              <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center' }} >
              {
                user ?
                <TextInput
                  value={name}                    
                  placeholder={'Nome do Livro'}                
                  onChangeText={this.onNameChange}
                  style={{ marginBottom: 0, fontSize: 12, paddingBottom: 5 }}
                />
                :
                <Text>
                  {book.name}
                </Text>
              }                
              </View>        

            </View>            
        

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20 }}>
              <Text>
                Autor            
              </Text>
            </View>            

            <View style={{ width: '50%' }}>
              <Text>
                {book.author}
              </Text>
            </View>            
          </View>  


           <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <View style={{ width: '50%', alignItems: 'flex-start', paddingLeft: 20, justifyContent: 'center' }}>
              <Text>
                Unidades disponíveis            
              </Text>
            </View>            

            <View style={{ width: '50%', justifyContent: 'center' }}>
            { user ? 
              <TextMask
                Component={TextInputAdapter}
                value={this.state.quantity}
                mask={decimalMask}
                onChange={this.onQuantityChange}
                style={{ paddingTop: 0, paddingBottom: 5 }}
                guide
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
                  Component={TextInputAdapter}
                  value={price}
                  mask={dollarMask}
                  onChange={this.onPriceChange}
                  style={{ paddingTop: 0, paddingBottom: 5 }}
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
  user: state.loginEmail.user,
  loading: state.forms.loading
});

const mapDispatchToProps = {
  navigationBack,
  updateBook  
};

export default connect(mapStateToProps, mapDispatchToProps)(BookScreen);

