const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const Function = require('../services/function');
const asyncHandler = require('express-async-handler');
const Account = require('../services/account');
router.get('/',asyncHandler(async function profile(req,res){
    const listUser = await User.findAllUser();
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
    //console.log(idNo);
    await Account.findAllAccount();
    await User.updateUser(id,email,displayName,phoneNumber,paperType,idNo,issued);
    const listUser = await User.findAll();
    res.redirect('../user_management');
    // #$2b$10$2cPbkBkeKkqf/7sx1kS46On7yQxSMqwxoPZtaB969KCDoBVuMClki
 }));

module.exports = router;