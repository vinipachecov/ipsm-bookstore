
const formidable = require('formidable');

function generateFilename(filename) {
  //extract the filename
  var ext_regex = /(?:\.([^.]+))?$/;
  //get the name of the file name, not the rest of the path
  var ext = ext_regex.exec(filename)[1];
  var date = new Date().getTime();
  var charBank = 'abcdefghijqlmonprstuvwxyz';
  var fstring = '';
  for(var i = 0; i < 15; i++) {
    fstring += charBank[parseInt(Math.random()*26)];
  }
  return (fstring += date + '.' + ext);
}

module.exports = (req, res) => {
  console.log(req);
  console.log(req.body);
  const newForm = new formidable.IncomingForm();  
  newForm.keepExtensions = true;
  newForm.parse(req, (err, fields, files) => {
    if (!err) {
      tmpFile = files.upload.path;
    fname = generateFilename(files.upload.name);
    nfile = os.tmpdir() + '/' + fname;
    //send back as a response
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end();
    } else {
      res.send(err);
    }
    console.log(newForm);
  });

  

  res.send('terminou onde não deveria.');  
}
