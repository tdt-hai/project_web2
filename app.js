var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
//Cookie session
var cookieSession = require('cookie-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var changePasswordRouter = require('./routes/changePassword');
var findUser = require('./routes/findUser');
var acc_authenticationRouter = require('./routes/acc_authentication');
var user_managementRouter = require('./routes/user_management');
var reset_password = require('./routes/reset_password');
var transaction_history = require('./routes/transaction_history');
const transferring_money = require('./routes/transferring_money');
const confirm_transferring_money = require('./routes/confirm_transferring_money');
const admin_auth = require('./routes/admin_auth');
const user_account = require('./routes/user_account');
var profileRouter = require('./routes/profile');
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
//Cấp quyền sử dụng thư mục public
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'user_management')));
//middleware
app.use(require('./middleware/auth'));
//router
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/login',loginRouter);     
app.use('/logout',logoutRouter);     
  
app.use('/findUser', findUser);  
app.use('/register',registerRouter);     
app.use('/user_management',user_managementRouter);

app.use('/changePassword',changePasswordRouter); 
app.use('/acc_authentication',acc_authenticationRouter);  
app.use('/reset_password',reset_password);  
app.use('/admin_auth',admin_auth);  
app.use('/user_account',user_account);  


app.use('/changePassword',changePasswordRouter);  
app.use('/profile',profileRouter);
app.use('/user_management',require('./routes/user_management'));
app.use('/savings_account',require('./routes/savings_account'));
app.use('/transferring_money',transferring_money);
app.use('/confirm_transferring_money',confirm_transferring_money);
app.use('/transaction_history',transaction_history);
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
