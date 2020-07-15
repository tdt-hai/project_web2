const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const Function = require('../services/function');
const asyncHandler = require('express-async-handler');

router.get('/',asyncHandler(async function profile(req,res){
    const listUser = await User.findAll();
    res.render('user_management', {listUser});
}));

router.get('/:id',asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const user = await User.findUserById(id);
    const time = Function.formatDate(user.date_range);
    res.render('edituser',{user,time});
}));
//Cập nhật thông tin người dùng
router.post('/:id',asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const temp = id;
    const email = req.body.email;
    const displayName = req.body.displayName;
    const phoneNumber = req.body.phoneNumber;
    const paperType = req.body.paperType;
    const idNo = req.body.idNo;
    const issued = req.body.issued;
    console.log(id,issued,paperType);
    await User.updateUser(id,email,displayName,phoneNumber,paperType,idNo,issued);
    const listUser = await User.findAll();
    res.redirect('../user_management');
 }));

module.exports = router;