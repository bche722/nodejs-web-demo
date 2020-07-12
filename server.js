var express = require('express');
var app = express();
var UserController = require('./controller/UserController')

app.set('views', './view')
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('message', { title: 'Hey', message: 'Hello there!'});
});
 
app.get('/doSignup', UserController.doSignUp);
app.get('/doSignin', UserController.doSignIn);
app.get('/doUpdate', UserController.doUpdate);
app.get('/doDelete', UserController.doDelete);
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("site: http://%s:%s", host, port) 
})