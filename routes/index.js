var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('register'));
router.use(session({
  cookie: {
    domain: 'localhost',
    signed: true,
  },
  name: 'conSid',
  resave: false,
  saveUninitialized: false,
  secret: 'register',
  rolling: false,
  unset: 'destroy'
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.cookies || !req.cookies.accessOK) {
    return res.render('index', { title: 'Express' });
  } else if (req.cookies.accessOK == 'o') {
    var user = isEmailAndGetName(req.session.username);
    return res.render('index', { title: 'Express', username: user });
  }
});

function isEmailAndGetName(address) {
  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  if (reg.test(address)) {
    return address.substring(0, address.indexOf('@'));
  } else return address;
}

module.exports = router;