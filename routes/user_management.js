const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
router.get('/',asyncHandler(async function profile(req,res){
    const listUser = await User.findAll();
    res.render('user_management', {listUser});
}));


module.exports = router;