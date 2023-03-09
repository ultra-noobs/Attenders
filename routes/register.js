var express = require('express');
var router = express.Router();
const userData = require('../models/userData')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=>{
    const studentPassword = req.body.psw;
    const rounds = 10;
    var hashedPassword = '';
    var ob1;
    // the password created is being hashed using bcrypt to maintain data privacy
    ob1 = await bcrypt.hash(studentPassword, rounds, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      }
      hashedPassword = hash;
      console.log("body: ", req.body);
      console.log("password: ", studentPassword);
      let studentDetails = new userData({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.usremail,
        password: studentPassword,
        role:"faculty"
      });
      studentDetails.save()
        .then((doc) => {
          console.log("saved:",doc)
        })
        .catch((err) => {
          console.log('error : ', err);
        });
    });
    res.render('landing', {});
  })

module.exports = router;