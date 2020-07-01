module.exports = function checkadmin(req,res,next){
    if(!req.currentUser || !req.currentUser.adminRole){
        res.redirect('/');
    }
    else{
        next();
    }
}