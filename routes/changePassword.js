var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
/*Login */
router.get('/', asyncHandler( async function (req,res,next){
    res.render('changePassword');
}));
//reset password 
router.get('/:id',async function (req,res){
    const id = req.params.id ;
    console.log(id);
    const users =  await user.findUserById(id);
    if(!users){
        return res.render('login');
    }
    req.session.userId = id;
    return res.redirect('/changePassword');
   
});
// change password
router.post('/',[
    body('newPassword')
    .isLength({min: 6}),
    body('confirmPassword')
    .isLength({min: 6}),
],asyncHandler(async function (req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('changePassword',{errors: errors.array()});
    }
    const users =  await user.findUserById(req.session.userId);
    if(!users || ( req.body.newPassword != req.body.confirmPassword)){
        return res.render('changePassword');
    }
    else{
        await user.update({
            password: user.hashPassword(req.body.newPassword),
        },
        {
            where: {
                email: users.email,
            }
        }
        );
        res.redirect('/logout');
    }
   
}));
module.exports = router;