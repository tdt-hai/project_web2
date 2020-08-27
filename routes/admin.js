var express = require('express');
var router = express.Router();
const User = require("../services/user");
const asyncHandler = require('express-async-handler');
const Function = require('../services/function');
/* GET users listing. */
router.get('/',Function.checkLogin,Function.checkAdmin, asyncHandler(async function(req, res, next) {
  if(req.currentUser){
    var allUser = await User.findAllUser();
    res.render('admin',{allUser});
}
else{
    
    res.redirect('/');
}
}));

module.exports = router;
