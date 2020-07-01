var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    delete req.session.userId ;
    res.redirect('/');
});
module.exports=router;