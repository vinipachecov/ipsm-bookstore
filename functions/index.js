const functions = require('firebase-functions');

const API = require('./API');
const Loginfunc = require('./Login');
// const FileUpload = require('./FileUpload');

exports.API = functions.https.onRequest(API);
// exports.login = functions.https.onRequest(Loginfunc);