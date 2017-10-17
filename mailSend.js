var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  auth: {
    user: '18601636329@163.com',
    pass: 'sunq0001' //授权码 
  }
});

exports.transporter = transporter;

