const { query } = require('../db/query');

// 注册
module.exports.user = async (username, password, mobile) => {
    // console.log(333)
    return await query(`insert into users (username, password,mobile) values ("${username}","${password}","${mobile}")`);
}
//手机号查看用户
module.exports.findUserByUserName = async (mobile) => {
    // console.log(333)
    return await query('select * from users where mobile =' + mobile);
}
//账号查看用户
module.exports.findUserBymobile = async (username) => {
    // console.log(333)
    return await query('select * from users where username =' + username);
}
//用户账号登录
module.exports.userLogin = async (username, password) => {
    return await query('select * from users where username = ?  and password = ?', [username, password]);
}
//手机号登录
module.exports.mobileLogin = async (mobile, password) => {
    return await query('select * from users where mobile = ?  and password = ?', [mobile, password]);
}
//手机号查看登录信息
module.exports.viewLogin = async (mobile) => {
    return await query('select * from users where mobile =' + mobile);
}
//账号查看登录信息
module.exports.viewusername = async (username) => {
    return await query('select * from users where username =?', [username]);
}