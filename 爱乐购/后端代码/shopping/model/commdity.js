const { query } = require('../db/query');
//一级分类
module.exports.topcategory = async ()=>{
   return await query('select * from topcategory');
}
//二级分类
module.exports.twoCategory = async (id)=>{
   return await query("select * from reclassify where chtic ="+id);
 }
 //二级分类商品类型详细信息
 module.exports.cateGories = async (id)=>{
   return await query("select * from newgoods where basis ="+id);
 }
  //获取二级分类商品类型详细信息
  module.exports.cateGoriesList = async ()=>{
   return await query("select * from newgoods");
 }