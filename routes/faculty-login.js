var express = require('express');
var router = express.Router();
const studentData = require('../models/userData')
const bcrypt = require('bcrypt')
var express = require("express")
var app = express()
var instructorMail = "";

router.get('/', function(req, res, next) {
res.render('faculty-login',{})
});

module.exports = router;
