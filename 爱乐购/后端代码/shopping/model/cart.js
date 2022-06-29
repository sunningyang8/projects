const { query } = require('../db/query');
// 加入购物车
module.exports.addlist = async (usersId, goodsId, num, goodsName, goodsPrice, image) => {
    // console.log(333)
    const res = await query(`insert into uersgoods (usersId,goodsId,num, goodsName,goodsPrice,image) values ("${usersId}","${goodsId}","${num}","${goodsName}","${goodsPrice}","${image}")`);
    return res
}
//通过用户ID获取购物车中的商品
module.exports.obtainList = async (usersId) => {
    let res = await query('select * from uersgoods where usersId =' + usersId)
    // console.log(333)
    return res
}
//通过id获取商品详细信息
module.exports.logistics = async (id) => {
    let res = await query('select * from uersgoods where id =' + id)
    // console.log(333)
    return res
}
//通过商品ID获取购物车中的商品
module.exports.obtaingoodsId = async (goodsId) => {
    // console.log(333)
    const res = await query('select * from uersgoods where goodsId =' + goodsId)
    return res
}
// 通过商品Id删除购物车商品
module.exports.delegoodsId = async (goodsId) => {
    // console.log(333)
    const res = await query('DELETE FROM uersgoods WHERE goodsId = ' + goodsId)
    return res
}
// 通过商品Id加减商品数量
module.exports.adsugoodsId = async (num, goodsId) => {
    // console.log(333)
    const res = await query(`UPDATE uersgoods SET num=? WHERE goodsId=?`, [num, goodsId])
    return res
}
//通过用户Id为商品添加地址
module.exports.addressGoodsId = async (addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId) => {
    const res = await query(`UPDATE uersgoods SET addressDetail=?,areaCode=?,city=?,country=?,county=?,isDefault=?,name=?,postalCode=?,province=?,tel=? WHERE usersId=?`, [addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId])
    return res
}
//添加地址
module.exports.serveaddres = async (addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId) => {
    return await query(`insert into servesaddres (addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId) values ("${addressDetail}","${areaCode}","${city}","${country}","${county}","${isDefault}","${name}","${postalCode}","${province}","${tel}","${usersId}")`);
}
//通过用户id查询地址
module.exports.viewadress = async (usersId) => {
    return await query('select * from servesaddres where usersId =' + usersId)
}
//通过id和用户id修改配送地址表中的状态
module.exports.deliveryId = async (id, usersId) => {
    return await query(`UPDATE servesaddres SET isDefault=1 WHERE id=? AND usersId=?`, [id, usersId])
}
//通过用户id修改配送地址的状态
module.exports.sinState = async (usersId) => {
    return await query(`UPDATE servesaddres SET isDefault=0 WHERE usersId=?`, [usersId])
}
//通过id寻找配送地址
module.exports.modify = async (id) => {
    return await query('select * from servesaddres where id =' + id)
}
//通过id和用户id修改配送信息
module.exports.distribution = async (addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId, id) => {
    return await query(`UPDATE servesaddres SET addressDetail=?,areaCode=?,city=?,country=?,county=?,isDefault=?,name=?,postalCode=?,province=?,tel=? WHERE usersId=? AND id=?`, [addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId, id])
}
//通过id删除配送信息
module.exports.deledistribution = async (id) => {
    return await query(`DELETE FROM servesaddres WHERE id=?`, [id])
}
//通过用户id和状态来查看符合条件的配送信息
module.exports.settlement = async (usersId) => {
    return await query('select * from servesaddres where usersId =? and isDefault=1', [usersId])
}
//购买后商品标识
module.exports.purchaseLogo=async (id)=>{
    return await query(`UPDATE uersgoods SET postalCode=1 WHERE id=?`, [id])
}