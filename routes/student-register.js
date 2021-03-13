var express = require('express');
var router = express.Router();
const multer = require("multer");
const fs = require("fs");

//multer options
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/uploads/images/")      //you tell where to upload the files,
  },
  filename: function (req, file, cb) {
    var regex = new RegExp('[^.]+$');
    let extension = file.originalname.match(regex);
    cb(null, req.body.roll_number+'.'+extension)
  }
})

var upload1 = multer({
  storage: storage,
});

/* GET users listing. */
router.get('/', (req, res, next) =>{
  res.render('student-register',{})
});


module.exports =  router;