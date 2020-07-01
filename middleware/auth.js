const User = require('../services/user');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async function auth(req,res,next){
    const userId = req.session.userId;
    res.locals.currentUser = null;
    if(!userId){
        return next();
    }
    const user = await User.findUserById(req.session.userId);

    if(!user){
        return next();
    }
    req.currentUser = user;
    req.currentUser.adminRole = user.adminRole;
    res.locals.currentUser = user;
    next();
})