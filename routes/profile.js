const {Router} = require('express');
const router = new Router();

router.get('/', function profile(req,res){
    if(req.currentUser){
        res.render('profile');
    }
    else{
        
        res.redirect('/');
    }
});


module.exports = router;