var express = require('express');
var router = express.Router();
var user = require('../services/user');
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async function(req, res, next) {
  res.render('index');
}));

module.exports = router;
