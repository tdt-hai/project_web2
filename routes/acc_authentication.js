var express = require('express');
var router = express.Router();
const user = require('../services/user');
const multer = require('multer');
const fs = require("fs");
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler (async function(req,res){
    const id = req.session.userId;
    res.render('acc_authentication',{id});
}))


var storage1 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    callback(null,`${req.session.userId}` + '-' + 'frontImage' + '.png' );
  }
});
var storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    callback(null, `${req.session.userId}` + '-' + 'backImage' + '.png');
  }
});
//upload mặt trước cmnd
var frontUpload = multer({ storage : storage1 }).array('frontImage',1);
router.post('/frontUpload',function(req,res){
  frontUpload(req,res,function(err) {  
      if(err) {
        res.redirect('/acc_authentication');
       return res.end();
      }
      res.redirect('/acc_authentication')
      res.end();
  });
});
//upload mặt sau cmnd
var backsideUpload = multer({ storage : storage2 }).array('backImage',1);
router.post('/backsideUpload',function(req,res){
  backsideUpload(req,res,function(err) {  
        if(err) {
          res.redirect('/acc_authentication');
          return res.end();
        }
        res.redirect('/acc_authentication')
        res.end();
    });
  });
module.exports = router;