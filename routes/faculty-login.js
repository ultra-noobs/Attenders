var express = require('express');
var router = express.Router();
const studentData = require('../models/userData')
const bcrypt = require('bcrypt')
var express = require("express")
var app = express()
var instructorMail = "";

router.get('/', function(req, res, next) {
res.render('faculty-login',{})
});

router.post("/", async (req,resp,next)=>{
        var usrEmail = req.body.usremail;
        // app.locals.mail  = req.body.usremail;
        // console.log(app.locals.mail)
        var temp;
        instructorMail =  usrEmail;
        console.log(req.body)
        //* Instructor Model is basically a model 
        temp = await studentData
          .find({ email: usrEmail,role:"faculty" })
          .then(async (doc) => {
            if(doc.length !=0){
            var ob1;
            // ob1 = await bcrypt.compare(
            //   req.body.usrpsw,
            //   doc[0].password,
            //   (err, res) => {

                // if (err) {
                //   resp.render('login', {});
                //   console.error(err);
                //   return;
                // }
                const res = req.body.usrpsw === doc[0].password;
                if(res){
                resp.redirect("/f-dashboard")
                }
                else{
                resp.render('faculty-login', {});
                }
              // }
            // );
            }else{
              resp.render('faculty-login', {});
            }
          })
          .catch((err) => {
            console.log('error finding user', err);
          });
    })

module.exports = router;
