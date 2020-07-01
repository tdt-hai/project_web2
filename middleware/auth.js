const user = require('../services/user');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async function auth(req,res,next){
    const UserID = req.session.userID;
    res.locals.currentUser = null;
    if(!UserID){
        return next();
    }
    const User = await user.finduserbyid(req.session.UserID);

    if(!User){
        return next();
    }
    req.currentUser = User;
    //req.currentUser.adminRole = User.adminRole;
    res.locals.currentUser = User;
    next();
})