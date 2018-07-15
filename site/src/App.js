import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import firebase from 'firebase';
import './App.css';
class App extends Component {

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBxOTO0OU5UxwTrGKp04LrEYUqe1phXgVY",
      authDomain: "church-library-1e9dc.firebaseapp.com",
      databaseURL: "https://church-library-1e9dc.firebaseio.com",
      projectId: "church-library-1e9dc",
      storageBucket: "church-library-1e9dc.appspot.com",
      messagingSenderId: "45539860131"
    };
    firebase.initializeApp(config);
  }


  state = {
    file: null
  };

  onSubmit = async (e) => {
    e.preventDefault();        
    console.log(e);    
    const { file } = this.state;
    console.log('vai enviar ', file);
    console.log('tipo do objeto = ', file.type);    
    console.log('test');

    const res = await axios.post(this.props.action, file, {
      headers: {                
        'Content-Type': 'multipart/form-data'
      }
    });    
    console.log(res);      
   
   
    // try {
    //   const user = await firebase.auth().signInWithEmailAndPassword(
    //     'lizzzdmc@gmail.com',
    //     '123456'
    //   );      
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // }  
    

  }

  onFileChange = (event) => {
    this.setState({ file: event.target.files[0] });    
  }

  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div> */}
          <form            
            id="main-login"            
            onSubmit={this.onSubmit}            
            action={this.props.action}
            method={this.props.method}            
          >            
            <h2>Admin UI Login</h2>            
            <label>              
                <span>Arquivo com tabela de Livros:</span>
                <br>
                </br>
                <input 
                  type="file" 
                  name="file" 
                  onChange={this.onFileChange}                  
                />
                <br/>
            </label>          
            <div>
                <button>Submit</button>
            </div>
          </form>
      </div>
    );
  }
}

App.defaultProps = {
  action: 'https://us-central1-church-library-1e9dc.cloudfunctions.net/xlsDataReceive/',
  method: 'post'
};

export default App;
