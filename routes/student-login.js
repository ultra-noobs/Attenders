var express = require('express');
var router = express.Router();
const studentData = require('../models/studentData')
const bcrypt = require('bcrypt')
var instructorMail;

router.get('/', function(req, res, next) {
res.render('student-login',{})
});

router.post("/", async (req,resp,next)=>{
        var usrEmail = req.body.usremail;
        var temp;
        console.log(req.body)
        //* Instructor Model is basically a model 
        temp = await studentData
          .find({ email: usrEmail,role:"student" })
          .then(async (doc) => {
            if(doc.length !=0){
            var ob1;
            console.log(" THis is doc[0[ password: ", doc[0].password);
            // ob1 = await bcrypt.compare(
            //   req.body.usrpsw,
            //   doc[0].password,
            //   (err, res) => {
            //     if (err) {
            //       resp.render('login', {});
            //       console.error(err);
            //       return;
            //     }
               const res = doc[0].password === req.body.usrpsw;
                if(res){
                resp.redirect("/s-dashboard")
                }
                else{
                resp.render('student-login', {});
                }
            //   }
            // );
            }else{
              resp.render('student-login', {});
            }
          })
          .catch((err) => {
            console.log('error finding user', err);
          });
    })

module.exports = router;
