var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.currentUser){
    res.render('admin');
}
else{
    
    res.redirect('/');
}
});

module.exports = router;
