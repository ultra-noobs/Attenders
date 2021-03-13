var express = require('express');
var router = express.Router();
const lectureData = require("../models/lectureData")

router.get("/",async (req,res)=>{
  await lectureData.find({faculty_mail:mail})
  .then((doc)=>{
      res.render('f-dashboard',{lectureInf:doc})
  })
})

router.get("/attendence/:id",async (req,res)=>{
  await session.find({id:req.params.id})
  .then((doc)=>{
      // console
      res.render('sheet',{studentInfo:doc,lecture_id:req.params.id,val:occur})
  })
})
//below route is for collecting responses

router.post("/",async (req,res)=>{
  console.log(req.body);
  let lectureInstance = new lectureData({
      faculty_mail: req.body.faculty_mail,
      lecture_name: req.body.name,
      st_time :req.body.sttime,
      end_time:req.body.endtime,
      lecture_date:req.body.lecturedate,
      lecture_id: req.body.lecture_id
  })
 var samp = await lectureInstance.save()
  .then((doc)=>{
      console.log("data save hogaya",doc)
  })
  res.redirect('/f-dashboard')
})


module.exports = router;
