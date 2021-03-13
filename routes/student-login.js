var express = require('express');
var router = express.Router();
var instructorMail;

router.get('/', function(req, res, next) {
res.render('student-login',{})
});

module.exports = router;
