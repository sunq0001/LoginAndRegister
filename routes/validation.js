var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var authUser = require('../authUser');
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

router.post('/', authUser.loginCheck, authUser.registerCheck);
router.post('/send-forgotten-password-to-mail', authUser.forgottenPassToMail);
router.get('/request-to-check-mail', authUser.checkMail);
router.get('/validation*', authUser.validationSuccess);
router.get('/logout', authUser.logoutClear);
router.get('/test/:id/:name', function (req, res, next) {
    console.log(req.param);
  });

module.exports = router;