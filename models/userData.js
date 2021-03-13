const mongoose = require("mongoose")

let facultyDetails = new mongoose.Schema({
    first_name:{type:String,default:null},
    last_name :{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    role:{type:String,default:null}
})

module.exports = mongoose.model('facultyDetail',facultyDetails);