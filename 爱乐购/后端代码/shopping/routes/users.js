const router = require('koa-router')()
const {user,userLogin,mobileLogin,viewLogin,viewusername} = require('../controller/users');
router.prefix('/users')
router.post('/user', user);//注册
router.post('/login', userLogin);// 账号密码登录
router.post('/mobile', mobileLogin);// 手机号登录
router.post('/viewLogin', viewLogin);// 手机号查看登录信息
router.post('/viewusername', viewusername);// 手机号查看登录信息

module.exports = router
