/*
 * @desc Load required modules
*/
var express = require('express');
var app = module.exports = express.createServer();
var sys = require('sys');
var fs = require('fs');

try {
  var configJSON = fs.readFileSync(__dirname + "/config/haller.json");
} catch(e) {
  console.log("File config/haller.json not found.");
}

var strung = configJSON.toString();

//var config = JSON.parse(strung);

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

var status = require('./lib/status');

// Home Page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Haller'
  });
});

var haller = require('./lib/haller');

// Twilio SMS
app.post('/status', function(req, res) {
  var message = req.body.Body;
  var from = req.body.From;
  //sys.log('Message: ' + message + ', From: ' + from);
  haller.Haller(req);
  var words = status.get(from, message);
  var twiml = '<?xml version="1.0" encoding="UTF-8" ?>\n<Response>\n<Sms>'+words+'</Sms>\n</Response>\n';
  res.send(twiml, {'Content-Type':'text/xml'}, 200);
});

// Only listen if parent module
if (!module.parent) {
  app.listen(10446);
  console.log("Express server listening on port %d", app.address().port);
}
