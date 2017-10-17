$(document).ready(function () {
    $('.reminder').text('');
    if (localStorage.getItem('registerPage') == 1) {
        $("[href='#login']").parent().removeClass('active');
        $("[href='#register']").parent().addClass('active');
        $("#login").removeClass('active');
        $("#register").addClass('active');

    } else {
        $("[href='#login']").parent().addClass('active');
        $("[href='#register']").parent().removeClass('active');
        $("#login").addClass('active');
        $("#register").removeClass('active');
    }

    if ($("[href='#login']").parent().hasClass('active') && $.cookie('accessOK') == 'f') {
        $('#usernameLogin').val(localStorage.getItem('usernameLogin'));
        $('#passwordLogin').val(localStorage.getItem('PasswordLogin'));
        $('#usernameLogin').parents('.form-group').prev('.reminder').stop()
            .text('用户名或密码不正确╮(╯▽╰)╭').css('color', 'red').css('opacity', 1)
            .animate({ opacity: 0 }, 3000);
        $.removeCookie('accessOK', { domain: 'localhost' });
    }

    if ($("[href='#register']").parent().hasClass('active') && $.cookie('accessOK') == 'f') {
        $('#usernameRegister').val(localStorage.getItem('usernameRegister'));
        $('#passwordRegister').val(localStorage.getItem('passwordRegister'));
        $('#confirmPasswordRegister').val(localStorage.getItem('confirmPasswordRegister'));
        $('#usernameRegister').parents('.form-group').prev('.reminder').stop()
            .text('用户名已被占用╮(╯▽╰)╭').css('color', 'red').css('opacity', 1)
            .animate({ opacity: 0 }, 3000);
        $.removeCookie('accessOK', { domain: 'localhost' });
    }



    $('#loginSubmitBtn').on('click', function (e) {
        localStorage.setItem('registerPage', 0);
        localStorage.setItem('usernameLogin', $('#usernameLogin').val());
        localStorage.setItem('passwordLogin', $('#passwordLogin').val());
        var eleUser = $('#usernameLogin');
        var userLoginResult = streamRegValidate(eleUser.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(eleUser);

                },
                'FAIL': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ban-circle' });
                    // addValidationReminder(eleUser, '用户名必须是邮箱或者手机号', 'red');
                    eleUser.parents('.form-group').prev('.reminder').stop()
                        .text('用户名必须是邮箱或者手机号').css('color', 'red').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);

                },
                'EMPTY': function () {
                    updateNextInputIcon(eleUser, { remove: '*' });
                    // addValidationReminder(eleUser, '用户名不能为空', 'purple');
                    eleUser.parents('.form-group').prev('.reminder').stop()
                        .text('用户名不能为空').css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'OR', isEmail, isCellphone);

        var elePass = $('#passwordLogin');
        var passwordLoginResult = streamRegValidate(elePass.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(elePass, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(elePass);
                },
                'FAIL': function () {
                    updateNextInputIcon(elePass, { remove: '*', afterOnce: 'ban-circle' });
                    // addValidationReminder(elePass, '密码必须是不小于6位的数字和字母的组合', 'red');
                    elePass.parents('.form-group').prev('.reminder').stop()
                        .text('密码必须是不小于6位的数字和字母的组合')
                        .css('opacity', 1).css('color', 'red')
                        .animate({ opacity: 0 }, 3000);
                },
                'EMPTY': function () {
                    updateNextInputIcon(elePass, { remove: '*' });
                    //  addValidationReminder(elePass, '密码不能为空', 'purple');
                    elePass.parents('.form-group').prev('.reminder').stop()
                        .text('密码不能为空').css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'ONE', isPasswordWordNumMoreThan6);

        totalvalidateResult = userLoginResult && passwordLoginResult;
        if (!totalvalidateResult) return e.preventDefault();
    })

    $('#forgetPassBtn').on('click', function () {
        $('#forgetPassModal').modal('show');
    });


    $('#findPass').on('click', function (e) {
        var eleUser = $('#forgetPassword');
        var forgetPassResult = streamRegValidate(eleUser.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(eleUser);

                },
                'FAIL': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ban-circle' });
                    //  addValidationReminder(eleUser, '用户名必须是邮箱或者手机号', 'red');
                    eleUser.parents('.form-group').prev('.reminder').stop()
                        .text('用户名必须是邮箱或者手机号').css('color', 'red').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                },
                'EMPTY': function () {
                    updateNextInputIcon(eleUser, { remove: '*' });
                    //  addValidationReminder(eleUser, '用户名不能为空', 'purple');
                    eleUser.parents('.form-group').prev('.reminder').stop().text('用户名不能为空')
                        .css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'OR', isEmail, isCellphone);
        if (!forgetPassResult) return e.preventDefault();
    });


    $('#registerSubmitBtn').on('click', function (e) {

        var totalvalidateResult,
            userRegisterResult,
            passwordRegisterResult,
            confirmPasswordResult

        var eleUser = $('#usernameRegister');
        userRegisterResult = streamRegValidate(eleUser.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(eleUser);

                },
                'FAIL': function () {
                    updateNextInputIcon(eleUser, { remove: '*', afterOnce: 'ban-circle' });
                    // addValidationReminder(eleUser, '用户名必须是邮箱或者手机号', 'red');
                    eleUser.parents('.form-group').prev('.reminder').stop()
                        .text('用户名必须是邮箱或者手机号').css('color', 'red').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);

                },
                'EMPTY': function () {
                    updateNextInputIcon(eleUser, { remove: '*' });
                    // addValidationReminder(eleUser, '用户名不能为空', 'purple');
                    eleUser.parents('.form-group').prev('.reminder').stop()
                        .text('用户名不能为空').css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'OR', isEmail, isCellphone);

        var elePass = $('#passwordRegister');
        passwordRegisterResult = streamRegValidate(elePass.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(elePass, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(elePass);
                },
                'FAIL': function () {
                    updateNextInputIcon(elePass, { remove: '*', afterOnce: 'ban-circle' });
                    // addValidationReminder(elePass, '密码必须是不小于6位的数字和字母的组合', 'red');
                    elePass.parents('.form-group').prev('.reminder').stop()
                        .text('密码必须是不小于6位的数字和字母的组合')
                        .css('opacity', 1).css('color', 'red')
                        .animate({ opacity: 0 }, 3000);
                },
                'EMPTY': function () {
                    updateNextInputIcon(elePass, { remove: '*' });
                    //  addValidationReminder(elePass, '密码不能为空', 'purple');
                    elePass.parents('.form-group').prev('.reminder').stop()
                        .text('密码不能为空').css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'ONE', isPasswordWordNumMoreThan6);

        var eleCon = $('#confirmPasswordRegister');
        var isPasswordConfirmed = isPasswordAddedEqual($('#passwordRegister').val());
        confirmPasswordResult = streamRegValidate(eleCon.val(),
            {
                'PASS': function () {
                    updateNextInputIcon(eleCon, { remove: '*', afterOnce: 'ok' });
                    removeValidataionReminder(eleCon);

                },
                'FAIL': function () {
                    updateNextInputIcon(eleCon, { remove: '*', afterOnce: 'ban-circle' });
                    // addValidationReminder(eleCon, '密码确认不正确', 'red');
                    eleCon.parents('.form-group').prev('.reminder').stop()
                        .text('密码确认不正确')
                        .css('color', 'red').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                },
                'EMPTY': function () {
                    updateNextInputIcon(eleCon, { remove: '*' });
                    // addValidationReminder(eleCon, '确认密码不能为空', 'purple');
                    eleCon.parents('.form-group').prev('.reminder').stop()
                        .text('确认密码不能为空').css('color', 'purple').css('opacity', 1)
                        .animate({ opacity: 0 }, 3000);
                }
            },
            'AND', isPasswordWordNumMoreThan6, isPasswordConfirmed);

        localStorage.setItem('registerPage', 1);
        totalvalidateResult = andSerial(userRegisterResult, passwordRegisterResult, confirmPasswordResult);
        if (!totalvalidateResult) {
            e.preventDefault();
        } else {
            localStorage.setItem('usernameRegister', $('#usernameRegister').val());
            localStorage.setItem('passwordRegister', $('#passwordRegister').val());
            localStorage.setItem('confirmPasswordRegister', $('#confirmPasswordRegister').val());
        }
    });

});

function andSerial(...args) {
    return args.reduce(function (pre, cur) {
        return pre && cur;
    });
}

function streamRegValidate(str, statusFuncObj, method, ...fn) {
    function StrValidate() {
        if (str == '') {
            return 'EMPTY';
        }
        var flag;
        if (method == 'AND') {
            flag = fn.reduce(function (pre, cur) {
                if (typeof pre == 'boolean') {
                    return pre && cur(str);
                } else if (typeof pre == 'function') {
                    return pre(str) && cur(str);
                }
            });
        } else if (method == 'OR') {
            flag = fn.reduce(function (pre, cur) {
                if (typeof pre == 'boolean') {
                    return pre || cur(str);
                } else if (typeof pre == 'function') {
                    return pre(str) || cur(str);
                }
            });
        } else if (method = 'ONE') {
            flag = fn[0](str);
        }
        return flag ? 'PASS' : 'FAIL';
    }
    var status = StrValidate();
    statusFuncObj[status]();
    return status == 'PASS' ? true : false
}

function isEmail(address) {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    return reg.test(address);
}

function isCellphone(num) {
    var reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    return reg.test(num);
}

function isPasswordWordNumMoreThan6(password) {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    return reg.test(password);
}

function isPasswordAddedEqual(password1) {
    return function (password2) {
        return password1 == password2 ? true : false;
    }
}

function updateNextInputIcon(element, iconNextUpdate) {
    if (iconNextUpdate.remove == undefined) {
        afterOnceInputIcon(element, iconNextUpdate.afterOnce);
    } else if (iconNextUpdate.afterOnce == undefined) {
        removeNextInputIcon(element, iconNextUpdate.remove);
    } else {
        removeNextInputIcon(element, iconNextUpdate.remove);
        afterOnceInputIcon(element, iconNextUpdate.afterOnce);
    }
}

function addValidationReminder(element, text, color) {
    var reminder = $('<h6></h6>').css('color', color).addClass('.reminder').addClass('text-left').text(text);
    var target = $(element).parents('.form-group');
    if (!target.prev().hasClass('.reminder')) {
        target.before(reminder);
    } else if (target.prev().text() != text) {
        target.prev().css('color', color).text(text);
    }
}

function removeValidataionReminder(element) {
    var target = element.parents('.form-group').prev();
    if (target.hasClass('.reminder')) {
        target.remove();
    }
}

function afterOnceInputIcon(element, iconStr) {
    var gyph = $('<span></span>').addClass('glyphicon').addClass('glyphicon-' + iconStr);
    var status = $('<div></div>').addClass('input-group-addon').append(gyph);
    if (!element.next().hasClass('input-group-addon')) {
        element.after(status);
    }
}

function removeNextInputIcon(element, iconStr) {
    if (element.next().hasClass('input-group-addon')) {
        if (iconStr == '*' && element.next().find('span').hasClass('glyphicon')) {
            element.next().remove();
        } else if (element.next().find('span').hasClass('glyphicon-' + iconStr)) {
            element.next().remove();
        }
    }
}