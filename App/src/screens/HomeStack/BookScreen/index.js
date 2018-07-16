import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput} from 'react-native';
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

const dollarMask = createNumberMask({
  prefix: 'R$ ',
  suffix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 10,
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
});

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
    console.log('livro selecionado = ', book);    
    this.state = {
      book,      
      price: book.price !== undefined && book.price !== null && book.price !== '' ? parseFloat(book.price.trim()) : 0.0,
      name: book.name,
      quantity: book.quantity      
    };
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

  
  sendUpdatedBookData = async () => {    
    const { name, quantity, price, book } = this.state;
    const { navigation } = this.props;
    let updatedBook = {
      name,
      quantity, 
      price: price.replace(',', '.').replace('R$', '').replace(' ', ''),
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
    console.log(book);
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
                <Text>{                  
                  book.price !== undefined && book.price !== null && book.price !== '' 
                  ?
                  book.price
                  :
                  'Valor a ser estabelecido!'
                }</Text>
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

