var express = require('express');
var router = express.Router();
const user = require('../services/user');
const Function = require('../services/function');
const multer = require('multer');
const fs = require("fs");
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async function profile(req,res){
    if(req.currentUser){
        const getdate = await Function.formatDate(req.currentUser.date_range);
        res.render('profile',{getdate});
    }
    else{
        
        res.redirect('/');
    }
}));
var storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/images/usersProfile');
    },
    filename: function (req, file, callback) {
      callback(null,`${req.session.userId}` + '.png' );
    }
  });
//upload profile
var upload = multer({ storage : storage1 }).array('userProfile',1);

router.post('/upload', function(req,res){
    upload(req,res,function(err) {  
      if(err) {
        res.redirect('/');
       return res.end();
      }
      res.redirect('/profile')
      res.end();
      //console.log(req.file,req.body)
      });
});

module.exports = router;