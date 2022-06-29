const { user, findUserByUserName, userLogin, mobileLogin, viewLogin, viewusername } = require('../model/users');
const Joi = require('joi');
const { cryptoPwd } = require('../utils');
const { secret, jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
//注册
module.exports.user = async (ctx) => {
    const { username, password, mobile } = ctx.request.body;
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/),
        repeat_password: Joi.ref('password'),
        mobile: Joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/)
    })
    const verify = schema.validate({ username, password, mobile });
    // console.log(verify.error.details[0])
    if (verify.error) {//判断校验是否通过
        ctx.body = {
            status: 0,
            message: verify.error.details[0].message
        }
        return
    }

    const mobiles = await findUserByUserName(mobile)//查询所有注册用户

    // const usernames = await findUserBymobile(username)//查询所有注册用户

    if (mobiles[0]) {//判断是否已经注册
        ctx.body = {
            status: 0,
            message: "你已经注册过"
        }
        return
    }

    const result = await user(username, cryptoPwd(password + secret), mobile);
    ctx.body = {
        status: 200,
        message: '注册成功'
    }
}
//账号密码登录
module.exports.userLogin = async (ctx) => {
    const { username, password } = ctx.request.body;
    const result = await userLogin(username, cryptoPwd(password + secret));
    if (result[0]) {
        const token = jwt.sign({
            username,
            password
        }, jwtSecret, { expiresIn: '5h' });
        ctx.body = {
            status: 200,
            data: {
                token
            },
            message: '登录成功'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '登录失败'
        }
    }
}
//手机号登录
module.exports.mobileLogin = async (ctx) => {
    const { mobile, password } = ctx.request.body;
    // console.log(mobile,password)
    const result = await mobileLogin(mobile, cryptoPwd(password + secret));
    // console.log(result)
    if (result[0]) {
        const token = jwt.sign({
            mobile,
            password
        }, jwtSecret, { expiresIn: '5h' });
        ctx.body = {
            status: 200,
            data: {
                token
            },
            message: '登录成功'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '登录失败'
        }
    }
}
//手机号查看登录信息

module.exports.viewLogin = async (ctx) => {
    const { mobile } = ctx.request.body;
    ctx.body = {
        status: 200,
        search: await viewLogin(mobile)
    }
}
//账号查看登录信息
module.exports.viewusername = async (ctx) => {
    const { username } = ctx.request.body;
    // const username=admin
    // console.log(username,"username")
    ctx.body = {
        status: 200,
        viewusername: await viewusername(username)
    }
}