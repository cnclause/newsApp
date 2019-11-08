var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


const users = require('./api/users')
const User = require('./models/user.js')
const articles = require('./api/articles')
const userarticles = require('./api/userarticles')
const memes = require('./api/memes')

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/api/users', users)
app.post('/signup', User.signup)
app.post('/signin', User.signin)

app.use('/api/articles', articles)

app.use('/api/userarticles', userarticles)
app.use('/api/memes', memes)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err.statusCode
  });
});




module.exports = app;
