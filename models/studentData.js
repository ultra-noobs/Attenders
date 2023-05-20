const mongoose = require("mongoose")

let studentData = new mongoose.Schema({
    first_name:{type:String,default:null},
    last_name :{type:String,default:null},
    student_id:{type:String, default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    role:{type:String,default:null},
    parent_email: {type: String, default: null}
})

module.exports = mongoose.model('studentData',studentData);