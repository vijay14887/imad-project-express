var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var app = express();

var path = require('path');

var cookieParser = require('cookie-parser')
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());

 app.use(express.static(__dirname + '/stylesheets'));
  app.use(express.static(__dirname + '/javascripts'));

var authid= {};
var authors= {};
 var newauthpost={
	authornames: '',
	count: 0
}; 
 /* var authpost=[{
	authornames: '',
	count: 0
}];  */
var authpost=[];
/*  var authornames= {};
var count = {};  */
var authcount;
var j;
var count1 = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Vijay' , title: 'Hello'});
  //res.render('index');
});

fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
		//console.log(json.length);
		//console.log(json[0].name);
		//console.log(json[0].id);	
		//var authornames= json[0].name;
		authcount = json.length;
		for(j=0; j<authcount ; j++){
		//authornames[j] = json[j].name;
		//authpost[j].authornames = json[j].name;
		authors[j]=json[j].name;
		//console.log("authornames[" + j + "]" + authornames[j]);	
		//console.log("authornames[" + j + "]" + authpost[j].authornames);	
		//console.log("authornames[" + j + "]" + authors[j]);	
		authid[j] = json[j].id;
		};
    }); 
	
	
	/* for (j=0; j< authcount; j++){
		count[j]= 0;
	}; */
	
	//var count=0;
	fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
		for (j=0; j< authcount; j++){
			for(var i=0; i<json.length; i++){
			//console.log(json.length);
			//console.log(json[0].name);
			//console.log(json[0].id);	
			//if (json[i].userId === authid[j]){
				if (authid[j] === json[i].userId ){
					count1 = count1 + 1;
					
					//count = count + 1;
				}
			};
			//count[j] = count1;
			//authpost[j].count = count1;
			//newauthpost.authornames = '';
		newauthpost={
			authornames: '',
			count: 0
		}; 
			//console.log("j"+ j);
			//console.log("authors[j]"+ authors[j]);
			newauthpost.authornames = authors[j];
			newauthpost.count = count1;
		
			//console.log("kumar"+ JSON.stringify(newauthpost));
			authpost.push(newauthpost);
		//console.log("count[" + j + "]" + count[j]);	
		//console.log("count[" + j + "]" + count1);
		//console.log("length" + JSON.stringify(authpost[j]));
		
		count1 = 0;
		//console.log("count[" + j + "]" + count);
			//count=0;
		};
		//console.log("vijay"+ JSON.stringify(authpost));
    }); 
	
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
	
	
router.get('/authors', function(req, res, next) {
  //res.render('authors_posts',{authornames:authornames, count:count});
	//res.render('authors', { authornames1:authornames , count2:count , title: 'Hello'});
	res.render('authors', { authpost1:authpost , title: 'List of Authors and their Post Count'});
  //res.render('index');
});

router.get('/getcookie', function(req, res, next) {
	//console.log('Vj');
	var getNamecookie = req.cookies.Name;
	var getAgecookie = req.cookies.Age;
	res.render('getcookie', { name: getNamecookie,  age: getAgecookie});
});

router.get('/robots.txt', function(req, res, next) {
	//console.log('Vj');
	//res.sendFile(path.join('http://httpbin.org','/deny'));
	/* var request = require('request');
    request('http://httpbin.org/deny', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Show the HTML for the Google homepage. 
	res.render('deny', { html: body});
  }
}) */
res.redirect('http://httpbin.org/deny');
});

router.get('/html', function(req, res, next) {
	//console.log('Vj');
	res.sendFile(path.join(__dirname,'/sample.html'));
});

router.get('/input', function(req, res, next) {
	
		res.sendFile(path.join(__dirname,'/input.html'));
		 //var stringtext = req.body.text_input;
		 
		//console.log("stringtext"+ stringtext);
		
});

router.get('/javascripts/submit.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/javascripts', 'submit.js'));
});

router.get('/stylesheets/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/stylesheets', 'style.css'));
});

router.post('/output', function(req, res, next) {
	
	//console.log("Vijay");
	var input = req.body.input_text;
	// console.log("Input Text"+ input);
	 process.stdout.write("Input Text"+ input);
		//res.sendFile(path.join(__dirname,'/input.html'));
		 //var stringtext = req.body.text_input;
		 
		//console.log("stringtext"+ stringtext);
		
});

module.exports = router;
