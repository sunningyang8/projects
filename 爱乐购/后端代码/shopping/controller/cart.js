const { addlist,logistics,purchaseLogo,settlement, obtainList, obtaingoodsId, delegoodsId, adsugoodsId, addressGoodsId, serveaddres, viewadress, deliveryId, sinState, modify, distribution,deledistribution } = require('../model/cart');
//添加购物车
module.exports.addlist = async (ctx) => {
    // const { id } = ctx.request.query;
    const { usersId, goodsId, num, goodsName, goodsPrice, image } = ctx.request.body;

    // const id = 3
    // console.log(ctx, 111)
    const res = await addlist(usersId, goodsId, num, goodsName, goodsPrice, image);
    ctx.body = {
        status: 200,
        addlist: res
    }
}
//获取购物车商品信息
module.exports.obtainList = async (ctx) => {
    // const { id } = ctx.request.query;
    const { usersId } = ctx.request.body;
    let res = await obtainList(usersId);
    // console.log(res)
    ctx.body = {
        status: 200,
        addlist: res
    }
}
//获取购物车商品信息
module.exports.obtaingoodsId = async (ctx) => {
    // const { id } = ctx.request.query;
    const { goodsId } = ctx.request.body;
    ctx.body = {
        status: 200,
        obtaingoodsId: await obtaingoodsId(goodsId)
    }
}
// 删除购物车商品
module.exports.delegoodsId = async (ctx) => {
    const { goodsId } = ctx.request.body
    ctx.body = {
        status: 200,
        delegoodsId: await delegoodsId(goodsId)
    }
}
//通过商品Id改变商品数量
module.exports.adsugoodsId = async (ctx) => {
    const { goodsId, num } = ctx.request.body
    ctx.body = {
        status: 200,
        adsugoodsId: await adsugoodsId(num, goodsId)
    }
}
//通过用户Id修改用户配送地址
module.exports.addressGoodsId = async (ctx) => {
    const { addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId } = ctx.request.body

    ctx.body = {
        status: 200,
        addressGoodsId: await addressGoodsId(addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId)
    }
}
//添加配送地址
module.exports.serveaddres = async (ctx) => {
    const { addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId } = ctx.request.body
    console.log(isDefault,"is")
    ctx.body = {
        status: 200,
        serveaddres: await serveaddres(addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId)
    }
}
//通过用户id查看配送地址
module.exports.viewadress = async (ctx) => {
    const { usersId } = ctx.request.body;
    ctx.body = {
        status: 200,
        viewadress: await viewadress(usersId)
    }
}
//通过用户id和id修改配送地址表中的状态
module.exports.deliveryId = async (ctx) => {
    const { id, usersId } = ctx.request.body;
    // console.log(isDefault,id,usersId)
    ctx.body = {
        status: 200,
        deliveryId: await deliveryId(id, usersId)
    }
}
//通过用户id修改配送地址的状态
module.exports.sinState = async (ctx) => {
    const { usersId } = ctx.request.body
    ctx.body = {
        status: 200,
        sinState: await sinState(usersId)
    }
}
//通过id寻找配送地址
module.exports.modify = async (ctx) => {
    const { id } = ctx.request.body
    ctx.body = {
        status: 200,
        modify: await modify(id)
    }
}
//通过id和用户id修改配送地址
module.exports.distribution = async (ctx) => {
    const { addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId, id } = ctx.request.body
    ctx.body = {
        status: 200,
        distribution: await distribution(addressDetail, areaCode, city, country, county, isDefault, name, postalCode, province, tel, usersId, id)
    }
}
module.exports.deledistribution=async (ctx)=>{//通过id删除配送信息
    const {id}=ctx.request.body
    ctx.body={
        status:200,
        deledistribution:await deledistribution(id)
    }
}
//通过用户id和状态来查看符合条件的配送信息
module.exports.settlement=async (ctx)=>{
    const {usersId}=ctx.request.body
    ctx.body={
        status:200,
        settlement:await settlement(usersId)
    }
}
//购买后商品标识
module.exports.purchaseLogo=async (ctx)=>{
    const {id}=ctx.request.body
    ctx.body={
        status:200,
        purchaseLogo:await purchaseLogo(id)
    }
}
//通过id获取信息
module.exports.logistics=async (ctx)=>{
    const {id}=ctx.request.body
    ctx.body={
        status:200,
        logistics:await logistics(id)
    }
}