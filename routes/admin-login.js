var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin-login',{})
});

router.post('/',(req,res)=>{
  var adminEmail = req.body.usremail;
    var adminPassword = req.body.usrpsw;
    console.log(req.body)
    if (adminEmail === 'nlok5923@gmail.com' && adminPassword === '123') {
      res.render('signup', {});
    } else {
      res.render('admin-login', {});
    }
})

module.exports = router;
