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

// location of HTML templates
app.set('views', __dirname + '/views');

//Middleware: homepage
app.get('/', function(req, res) {
  
  var headIP   = req.headers['x-forwarded-for'];
  var headLang = req.headers['accept-language'].split(',')[0];
  var headOS   = req.headers['user-agent'];
  
  res.render('home', { htmlIP: headIP, htmlLang: headLang, htmlOS: headOS });

});

//Middleware: service
app.get('/:input', function (req, res) {
  
  //Initialize variables
  var outputJSON = {"your_alias": null, "original_url": req.params.input};
  var outputERR = {"error": null};
  var argIsInt = isInt(req.params.input);
  var argIsUrl = isStr(req.params.input);
  
  //Input date to unix format
  if (argIsInt){
    // Handle integer input
    outputERR.error = "int";
  } else if (argIsUrl){
    //Handle non integer input
    outputERR.error = "url";
  } else {
    //Handle errors
    outputERR.error = "err";
  }
  
  //Write response
  console.log(outputERR);
  res.send(outputERR);
});

// start App
app.listen(myPort, function () {
  console.log('Example app listening on port '+myPort+'!');
});


/*
 * Functions
 */
function isInt(input){
  var regNumbersOnly = new RegExp('^[0-9]+$');
  if (regNumbersOnly.test(input)) return parseInt(input,10);
  else return false;
}

function isStr(input){
  return true;
}