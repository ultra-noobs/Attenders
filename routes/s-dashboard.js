var express = require('express');
var router = express.Router();
var studentData = require('../models/studentData')


router.get("/",async (req,res)=>{
    await studentData.find({})
    .then((doc)=>{
        console.log(doc)
        res.render('s-dashboard',{studentarray: doc})
    })
    // res.render('s-dashboard',{})
})



module.exports = router;