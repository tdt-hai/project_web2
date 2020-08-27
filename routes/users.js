var express = require('express');
var router = express.Router();
const Function = require('../services/function');

/* GET users listing. */
router.get('/',Function.checkLogin, function(req, res, next) {
  res.render('users');
});

module.exports = router;
