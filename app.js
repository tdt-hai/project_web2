var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//Cookie session
var cookieSession = require('cookie-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var changePasswordRouter = require('./routes/changePassword');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Use session
app.use(cookieSession({
  name: 'session',
  keys: ['123456']
}))
app.use(express.static(path.join(__dirname, 'public')));
//middleware
app.use(require('./middleware/auth'));
//router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);     
app.use('/logout',logoutRouter);     
app.use('/register',registerRouter);     
app.use('/changePassword',changePasswordRouter);     

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
