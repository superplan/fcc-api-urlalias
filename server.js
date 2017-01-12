//Get packages
var express = require('express');
var morgan = require("morgan");

// Invoke App
var app = express();

//Config
app.use(morgan('dev'));
app.set('view engine', 'pug');

//Global variables
var myPort = process.env.PORT;
// var myHost = process.env.IP;

// location of HTML templates
app.set('views', __dirname + '/views');

//Middleware: homepage
app.get('/', function(req, res) {
  
  var headIP   = req.headers['x-forwarded-for'];
  var headLang = req.headers['accept-language'].split(',')[0];
  var headOS   = req.headers['user-agent'];
  
  res.render('home', { htmlIP: headIP, htmlLang: headLang, htmlOS: headOS });

});

app.listen(myPort, function () {
  console.log('Example app listening on port '+myPort+'!');
});
