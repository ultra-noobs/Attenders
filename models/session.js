const mongoose = require("mongoose");

const session = new mongoose.Schema({
    id:{
        type:String
    },
    student_id:{
        type:String
    },
    times:{
        type:Number
    }
})

module.exports = mongoose.model("session",session);