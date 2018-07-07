const express = require('express');
node_xj = require("xls-to-json");
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.post('/', (req,res) => {
  console.log('req.body = ', req.body);
  console.log(req.body.file);
  node_xj({
    input: req.body.file,  // input xls
    output: "output.json", // output json
    sheet: "Lista de estoque"  // specific sheetname
  }, (err, result) => {
    if(err) {
      console.error(err);
      res.send('Post function!');
    } else {
      console.log('resultado do post');
      console.log(result);        
      res.send(`${req.method} function!, ${req.body}`);    
    }
  });
});

module.exports = app;

  // if (req.method === `POST`) {
  //   console.log('req.body = ', req.body);


  //   console.log(req.body.file);
  //   node_xj({
  //     input: req.body.file,  // input xls
  //     output: "output.json", // output json
  //     sheet: "Lista de estoque"  // specific sheetname
  //   }, (err, result) => {
  //     if(err) {
  //       console.error(err);
  //       res.send('Post function!');
  //     } else {
  //       console.log('resultado do post');
  //       console.log(result);        
  //       res.send(`${req.method} function!, ${req.body}`);    
  //     }
  //   });
  // } else {
 

  // imprimir o req para verificar se o arquivo está sendo recebido

  // transformar o arquivo recebido em um json

  // verificar que os dados foram traduzidos


  // remover base atual e inserir nova base

  // enviar os dados para o firebase

  


