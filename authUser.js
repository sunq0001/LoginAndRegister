var User = require('./userSchema.js');
var transporter = require('./mailSend').transporter;
var hostname = 'localhost';
var port = 3000;

exports.logoutClear = function (req, res, next) {
    if (req.query.logout == 1) {
        res.clearCookie('conSid', { domain: req.hostname });
        res.clearCookie('accessOK', { domain: req.hostname });
        req.session.destroy(function (err) {
            console.log('session is destroyed')
        })
        console.log('logout executed');
        res.end();
    } else next()
}

exports.loginCheck = function (req, res, next) {
    console.log(req.ip);
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.originalUrl)
    if (req.body.usernameLogin) {
        User
            .findOne({ username: req.body.usernameLogin })
            .where('password').equals(req.body.passwordLogin)
            .select('username password')
            .exec(function (err, result) {
                if (err) return console.log(err);
                if (result != null) {
                    req.session.regenerate(function (err) {
                        if (err) return console.log(err);
                        console.log(result);
                        console.log('session regenerated.');
                        req.session.username = req.body.usernameLogin;
                        req.session.password = req.body.passwordLogin;
                        res.cookie('accessOK', 'o', { domain: hostname });
                        return res.redirect('/');
                    });
                } else {
                    res.cookie('accessOK', 'f', { domain: hostname });
                    return res.redirect('/users');
                }
            });
    } else next();

}

exports.registerCheck = function (req, res, next) {
    if (req.body.usernameRegister) {
        User.findOne({ username: req.body.usernameRegister }, function (err, result) {
            if (err) return console.log(err);
            if (result) {
                console.log('occupied username');
                res.cookie('accessOK', 'f', { domain: hostname });
                return res.redirect('/users');
            } else {
                req.session.regenerate(function (err) {
                    if (err) return console.log(err);
                    console.log('session regenerated.');
                    req.session.username = req.body.usernameRegister;
                    req.session.password = req.body.passwordRegister;
                    res.cookie('accessOK', 'o', { domain: hostname });
                    return res.redirect(req.originalUrl + 'request-to-check-mail');
                });
            }
        });
    } else next();
}

exports.forgottenPassToMail = function (req, res, next) {
    if (req.body.forgetPassword) {
        User.findOne({ username: req.body.forgetPassword }, function (err, result) {
            if (err) return console.log(err);
            if (result) {
                console.log(result);
                var mailOptions = {
                    from: '18601636329@163.com', // 发送者  
                    to: req.body.forgetPassword, // 接受者,可以同时发送多个,以逗号隔开  
                    subject: 'myFun 网页找寻密码', // 标题  
                    //text: 'Hello world', // 文本  
                    html: `<h3>你的密码是</h3><h5>${result.password}</h5>`
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) return console.log(err);
                    console.log('发送成功！');
                    console.log(info);
                    return res.send('密码已经发送到你的邮箱:' + req.body.forgetPassword + '请注意查收！');
                });
            } else {
                return res.send('<p>你的邮箱尚未注册，请到主页点击<strong><i>&nbsp登陆/注册&nbsp</i></strong>按钮注册, OK?</p> <a href="http://localhost:3000/">主页 </a>')
            }
        });
    } next();
}

exports.checkMail = function (req, res, next) {
    if (!req.signedCookies.conSid) return res.redirect('/');

    var validLink = 'http://'
        + hostname
        + ':' + port
        + req.baseUrl 
        + '/validation'
        + req.signedCookies.conSid;

    var receiver = req.session.username;
    var mailOptions = {
        from: '18601636329@163.com', // 发送者  
        to: receiver, // 接受者,可以同时发送多个,以逗号隔开  
        subject: 'myFun 网页用户验证', // 标题  
        //text: 'Hello world', // 文本  
        html: `<h2>温柔地点击下面的链接，你就可以在myFun里面(｡･∀･)ﾉﾞ嗨了哈:</h2><h3>  
        <a href="${validLink}">${validLink}</a></h3>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) return console.log(err);
        console.log('发送成功:');
        console.log(info);
        res.set('Content-type', 'text/html');
        res.send(
            '<p>请到你的邮箱 ' + req.session.username + ' 点击验证链接完成验证! /\(^o^)/~</p>' +
            '<p>若没有收到，请查看垃圾邮箱，也许在那里。╮(╯▽╰)╭ </p>'
        );
    });
}

exports.validationSuccess = function (req, res, next) {
    var user = new User({
        username: req.session.username,
        password: req.session.password
    });

    user.save(function (err, user) {
        if (err) return console.log(err);
        console.log('saved');
        console.log(user);
        res.cookie('accessOK', 'o', { domain: req.hostname });
        res.render('redirectToHome', { message: '验证成功，三秒后页面跳转到主页' });
    });
}
