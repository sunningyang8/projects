const { query } = require('../db/query');
// 轮播图
module.exports.swipers = async ()=>{
   return await query('select * from swipers');
}
// 分类详情组件
module.exports.classifyList = async ()=>{
   return await query('select * from classify');
}
//宫格组件
module.exports.navList = async ()=>{
   return await query('select * from nav');
}
// 商品
module.exports.goodsList = async ()=>{
   return await query('select * from goods');
}