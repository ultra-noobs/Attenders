const mongoose = require("mongoose")

let lectureDetails = new mongoose.Schema({
    faculty_mail:{type:String,default:null},
    lecture_name:{type:String,default:null},
    st_time :{type:String,default:null},
    end_time:{type:String,default:null},
    lecture_date:{type:String,default:null},
    lecture_id:{type:String,default:null}
})

module.exports = mongoose.model('lectureDetail',lectureDetails);