var express = require('express');
var router = express.Router();
var user = require('../services/user');
const asyncHandler = require('express-async-handler');
const Function = require('../services/function');
/* GET home page. */
router.get('/',Function.checkLogin,asyncHandler(async function(req, res, next) {
  res.render('login');
}));

module.exports = router;
