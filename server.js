/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\nApp (haller) is running..');
}).listen(10446);
*/

// Init App
var express = require('express');
var app = module.exports = express.createServer();
var sys = require('sys');

// Config
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
	app.use(express.errorHandler()); 
});

/*
	Define Routes
*/

// Home Page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Dashboard'
  });
});

// Subscription form
app.get('/subscribe', function(req, res) {
	res.render('subscribe', {
		title: 'Subscribe'
	});
});

// Twilio SMS
app.post('/send', function(req, res) {
  var message = req.body.Body;
  var from = req.body.From;
  sys.log('Message: ' + message + ', From: ' + from);
  var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Sms>Yo Dawg, I heard you like texts.</Sms>\n</Response>';
  res.send(twiml, {'Content-Type':'text/xml'}, 200);
});

// List Alerts
app.get('/alerts.:format?', function(req, res) {
  res.render('alerts/index', {
    title:'Alerts'
  });	
});

// Create a new Alert
app.get('/alerts/new', function(req, res) {
	res.render('alerts/new.jade', {
		locals: { title: 'New Alert' }
	});
});

// Save a new Alert
app.post('/alerts.:format?', function(req, res) {
	
});

// View an Alert
app.get('/alerts/:id.:format?', function(req, res) {

});

// Update an Alert
app.put('/alerts/:id.:format?', function(req, res) {

});

// Delete an Alert
app.del('/alerts/:id.format?', function(req, res) {

});

// List all subscribers
app.get('/subscribers', function(req, res) {
	res.render('subscribers/index', {
		title: 'Subscribers'
	});
});

// Only listen if parent module
if (!module.parent) {
  app.listen(10446);
  console.log("Express server listening on port %d", app.address().port);
}














