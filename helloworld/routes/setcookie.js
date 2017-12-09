var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser());
 
// set a cookie
router.get('/', function(req, res, next) {
  // check if client sent cookie
  console.log('Vijay SetCookie');
    //res.clearCookie("cookieName");
  //res.clearCookie("Name");
	//res.clearCookie("Age");
	//res.clearCookie(cookie);

  var cookie1 = req.cookies.Name;
  var cookie2 = req.cookies.Age;
  	//var cookie;
  if (cookie1 === undefined && cookie2 === undefined)
  {
    // no: set a new cookie
    //var randomNumber=Math.random().toString();
    //randomNumber=randomNumber.substring(2,randomNumber.length);
	 var name='Vijay';
	 var age=30;

    res.cookie('Name', name);
	res.cookie('Age', age);
    console.log('cookie created successfully');
	res.render('setcookie', { title: 'Cookie Set'});
  } 
  else
  {
    // yes, cookie was already present 
	res.render('setcookie', { title: 'Cookie Already Set'});
    console.log('cookie exists', cookie1 + cookie2);
  } 
  //next(); // <-- important!
});


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});



module.exports = router;
