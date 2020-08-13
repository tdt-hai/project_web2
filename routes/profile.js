var express = require('express');
const router = express.Router();
const user = require('../services/user');
const Function = require('../services/function');
const multer = require('multer');
const fs = require("fs");
const asyncHandler = require('express-async-handler');
const account = require('../services/account');

router.get('/', asyncHandler(async function profile(req, res) {
  const id = req.session.userId;
  if (req.currentUser) {
    const getdate = await Function.formatDate(req.currentUser.date_range);
    res.render('profile', { getdate, id });
  }
  else {
    res.redirect('/');
  }
}));
// var storage1 = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, './public/images/usersProfile');
//     },
//     filename: function (req, file, callback) {
//       callback(null,`${req.session.userId}` + '.png' );
//     }
//   });
// //upload profile
// var upload = multer({ 
//   storage : storage1,
//   limits: {
//      fileSize: 1024*1024
// }}).array('userProfile',1);

// router.post('/upload', function(req,res){
//     upload(req,res,function(err) {  
//       if(err) {
//         res.redirect('/profile');
//        return res.end();
//       }
//       console.log(req.body, 'Body');
//       console.log(req.files, 'files');
//       res.redirect('/profile')
//       res.end();
//     });
// });


const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, './public/images/usersProfile');
    },
    filename: function (req, file, cb) {
      cb(null, `${req.session.userId}` + '.png');
    }
  });

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

const upload = multer(
  {
    storage: storage,
    limits:
    {
      fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
  });


router.post("/upload", (req, res, next) => {
  upload.single('userProfile')(req,res,function(err) {  
          if(err) {
            res.redirect('/profile');
           return res.end();
          }
          console.log(req.body, 'Body');
          console.log(req.files, 'files');
          res.redirect('/profile')
          res.end();
        });
});
module.exports = router;