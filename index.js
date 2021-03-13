var createError = require('http-errors');
var express = require('express');
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const homeRouter = require('./routes/home')
const studentRegister = require('./routes/student-register')
const signRouter = require("./routes/student-login")
const adminRouter = require("./routes/admin-login")
const facultyRouter = require('./routes/f-dashboard')

var app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/student-login',signRouter);
app.use('/admin-login',adminRouter);
app.use('/student-register',studentRegister);
app.use('/f-dashboard',facultyRouter);

app.listen(port,(req,res)=>{
    console.log("up and running")
})