var express = require('express');
var http = require('http');
var yunOAuth2 = require('yunOAuth2');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret:'-_-!'}));
app.use(yunOAuth2.middleware());
app.use(app.router);


yunOAuth2.easyAuth(app, {host: '192.168.20.100:3000', clientSecret:'clientSecret', clientID: "5ca33a6f5ab3d1abd7bdbfcb53821539"});
app.get('/', function (req, res) {
	if (!req.user) {
		res.redirect('/yunOAuth2');
	} else {
		console.log(req.user);
		res.send('Hello');
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
