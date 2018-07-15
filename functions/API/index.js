
const express = require('express');
const node_xj = require("xls-to-json");
const admin = require('firebase-admin');

const cors = require('cors');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const storage = require('@google-cloud/storage')
var serviceAccount = require('../credentials.json')

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "church-library-1e9dc.appspot.com",
  databaseURL: "https://church-library-1e9dc.firebaseio.com"
});




app.use(cors({ origin: true }));
app.use(fileUpload());
app.use(bodyParser.json());

app.post('/login', (req,res) => {     

  const { email, password } = req.body;
  console.log(req.body);
  try {    
    const user = firebase.auth().signInWithEmailAndPassword(email,password);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send('Erro ao logar');
  }  
});

app.get('/BookData', async (req,res) => {      
  
  const bucket = admin.storage().bucket('church-library-1e9dc.appspot.com');
  // console.log('pegou bucket = ', bucket);
  // const bucket = storage.bucket('gs://church-library-1e9dc.appspot.com');  
  const book = await bucket.get('sample.xlsx');  
  console.log(book);
  res.send(book);
    
  
  // const bookData = storage.ref('samples.xlsx');
  // if(!req.files) {
  //   res.send('no files uploaded!')
  // } else {
  //   console.log(req.files);
  //   res.send('file uploaded')
  // }
  // imprimir o req para verificar se o arquivo está sendo recebido

  // transformar o arquivo recebido em um json

  // verificar que os dados foram traduzidos


  // remover base atual e inserir nova base

  // enviar os dados para o firebase

  
  // console.log('body do arquivo = ', req.body);
  // if (req.body.file !== undefined && req.body.file !== null) {
  //   console.log(req.body.file);

 
  // } else {    
  //   res.send('Post request done, no file sent!!!');    
  // }  
});

module.exports = app;
