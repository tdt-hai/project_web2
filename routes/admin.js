var express = require('express');
var router = express.Router();
const User = require("../services/user");
const asyncHandler = require('express-async-handler');
/* GET users listing. */
router.get('/', asyncHandler(async function(req, res, next) {
  if(req.currentUser){
    const allUser = await User.findAllUser();
    res.render('admin',{allUser});
}
else{
    
    res.redirect('/');
}
}));

module.exports = router;
