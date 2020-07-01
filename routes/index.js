var express = require('express');
var router = express.Router();
var user = require('../services/user');
const asyncHandler = require('express-async-handler');
/* GET home page. */
router.get('/', asyncHandler(async function(req, res, next) {
  const userid = await user.findAll();
  res.send("Đây là trang index");
}));

module.exports = router;
