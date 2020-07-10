const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
router.get('/',asyncHandler(async function profile(req,res){
    const listUser = await User.findAll();
    res.render('user_management', {listUser});
}));

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
 return [year, month, day].join('-');
}

router.get('/:id',asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const user = await User.findUserById(id);
    const time = formatDate(user.date_range);
    res.render('edituser',{user,time});
}));

router.post('/:id',asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const temp = id;
    const email = req.body.email;
    const displayName = req.body.displayName;
    const paperType = req.body.paperType;
    const idNo = req.body.idNo;
    const issued = req.body.issued;
    console.log(id,issued,paperType);
    await User.updateUser(id,email,displayName,paperType,idNo,issued);
    const listUser = await User.findAll();
    res.redirect('../user_management');



 }));


module.exports = router;