const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
router.get('/',asyncHandler(async function profile(req,res){
    const listUser = await User.findAll();
    res.render('user_management', {listUser});
}));


router.get('/:id',asyncHandler(async function(req,res){
    const {id} = req.params;
    const user = await User.findUserById(id);
    //const time = formatDate(conf.timeStarted);
    res.render('edituser',{user});
}));

module.exports = router;