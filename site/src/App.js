import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
class App extends Component {
  state = {
    file: null
  };

  onSubmit = (e) => {
    console.log(e);    
    const { file } = this.state;
    console.log('vai enviar ', file);

    e.preventDefault();        

    axios.post(this.props.action, file, {
      headers: {      
          'Accept': 'application/json',
        'Accept': 'application/file',
        'Content-Type': file.type
      }
    });

    // fetch(this.props.action, {      
    //   method: 'POST',
    //   headers: {            
    //         'Content-Type': file.type
    //   },
    //   body: file
    // });
  }

  onFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
    
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <form
            id="main-login"            
            onSubmit={this.onSubmit}>
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
  action: 'https://us-central1-church-library-1e9dc.cloudfunctions.net/XLSDataReceive/',
  method: 'post'
};

export default App;
