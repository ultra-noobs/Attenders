var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
const studentData = require("../models/studentData")
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

const upload = (rollnumber,filename)=>{

  if (!admin.apps.length){
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "attender-84a2c.appspot.com"
    });
  }
  
  var bucket = admin.storage().bucket();
  const uploadFile = async()=>{
    try {
      const metadata = {
        metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: rollnumber
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
      };
      // Uploads a local file to the bucket
      await bucket.upload(`public/uploads/images/${filename}` , {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        destination:rollnumber,
        gzip: true,
        metadata: metadata,
      });
    
      console.log(`${filename} uploaded successfully.`);
      fs.unlink(`public/uploads/images/${filename}`,(err)=>{
        if(err){
          console.log("error while deleting image ",err);
        }else{
          console.log("Image Deleted Successfully :) ");
        }
      })
    } catch (error) {
       console.log("Error in uploading picture ",error);
    }
  }
  // console.log(bucket)
  uploadFile();
}

router.post('/',upload1.single('image'),async (req,res)=>{
    const studentPassword = req.body.psw;
    const rounds = 10;
    var hashedPassword = '';
    console.log(" This is req.body :", req.body);

    // the password created is being hashed using bcrypt to maintain data privacy
    await bcrypt.hash(studentPassword, rounds, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      }
      hashedPassword = hash;
      var regex = new RegExp('[^.]+$');
      let extension = req.file.originalname.match(regex);
      let filename = req.body.roll_number+'.'+extension;
      upload(req.body.roll_number,filename);
      let studentDetails = new studentData({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.usremail,
        parent_email : req.body.parentemail,
        password: studentPassword,
        role: "student",
        student_id: req.body.roll_number,
      });
      studentDetails.save()
        .then((doc) => {
         console.log("Student Registered in database successfully.");
        })
        .catch((err) => {
          console.log('error : ', err);
        });
    });
    res.render('landing', {});
  })


module.exports =  router;