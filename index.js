var createError = require('http-errors');
var express = require('express');
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const homeRouter = require('./routes/home')
const studentRegister = require('./routes/student-register')
const signRouter = require("./routes/student-login")
const adminRouter = require("./routes/admin-login")
const facultyRouter = require('./routes/f-dashboard')
const facultySigninRoute = require("./routes/faculty-login")
const registerRouter = require("./routes/register")
const studentRouter = require("./routes/s-dashboard")
const cron = require('node-cron')
const { sendMailToAllStudentParents } = require('./services/sendMail')
// const studentData = require('../models/studentData')

var app = express();

cron.schedule('0 0 * * 0', () => {
  sendMailToAllStudentParents();
});

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const  mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://attenderdp:doctorpatient1234@cluster0.asb7n.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log('not connected',err);
  });

app.get("/test",(req,res)=>{
  res.render('testing',{})
})

app.use('/', homeRouter);
app.use('/student-login',signRouter);
app.use('/admin-login',adminRouter);
app.use('/student-register',studentRegister);
app.use('/f-dashboard',facultyRouter);
app.use('/s-dashboard',studentRouter);
app.use('/faculty-login',facultySigninRoute);
app.use('/register',registerRouter);


app.listen(port,(req,res)=>{
    console.log("up and running")
})