const firebase = require('firebase');

module.exports = (req,res) => {

  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = firebase.auth().signInWithEmailAndPassword(email,password);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send('Erro ao logar');
  }  
}