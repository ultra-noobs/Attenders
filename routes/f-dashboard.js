var express = require('express');
var router = express.Router();
const lectureData = require("../models/lectureData")
const session = require("../models/session")
var express = require("express")
var app = express()
var mail="";
router.post("/mail",(req,res)=>{
    mail = req.body.mail;
})
var occur = 0;
router.post("/set-occur",(req,res)=>{
    occur = Number(req.body.occur);
    console.log(occur)
    res.redirect("/f-dashboard")
})

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

router.post("/faculty/:id",async(req,res)=>{
    const id = req.params.id;
    console.log("inside post ");
    const student_id = req.body.student_id;
    const lec = await lectureData.findOne({lecture_id:id});
    if(lec!=null){
        const y1 = (lec.lecture_date).substr(0,4);
        const m1 = (lec.lecture_date).substr(5,2);
        const d1 = (lec.lecture_date).substr(8,2);
        var st_time = lec.st_time;
        var end_time = lec.end_time;
        var today = new Date();
        var d2 = String(today.getDate()).padStart(2, '0');
        var m2 = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var y2 = String(today.getFullYear());
        var h1 = String(today.getHours()).padStart(2,'0');
        var min1 = String(today.getMinutes()).padStart(2,'0');
        var time = h1+":"+min1;
        console.log(y1+" "+y2+" "+m1+" "+m2+" "+d1+" "+d2+" "+time+" "+st_time+" "+end_time)
        if(y1==y2 && m1==m2 && d1==d2 && time>=st_time && time<=end_time)
        {
            console.log("Attendance Marked");
            const data = await session.findOne({id:id,student_id:student_id});
            if(data!=null){
                const tme = data.times;
                const finalData = await session.findOneAndUpdate(
                    {id:id,student_id:student_id},
                    {times:tme+1},
                    {new:true}
                )
                console.log(finalData);
            }else{
                const studentSession = new session({
                    id:id,
                    student_id:student_id,
                    times:1
                });
                const finalData = await studentSession.save();
                console.log(finalData);
            }
        }
    }
})

module.exports = router;