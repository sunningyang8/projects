const router = require('koa-router')();
const { addlist,logistics,purchaseLogo,obtainList,settlement,obtaingoodsId,delegoodsId,adsugoodsId,addressGoodsId,serveaddres,viewadress,deliveryId,sinState,modify,distribution,deledistribution} = require('../controller/cart');
router.prefix('/cart')
router.post('/usergoods', addlist);//添加购物车
router.post('/obtainList', obtainList);//通过userId获取购物车商品
router.post('/obtaingoodsId', obtaingoodsId);//通过goodsId获取购物车商品
router.post('/delegoodsId', delegoodsId);//通过goodsId删除购物车商品
router.post('/adsugoodsId', adsugoodsId);//通过goodsId删除购物车商品
router.post('/addressGoodsId',addressGoodsId)//通过goodsid修改配送地址
router.post('/serveaddres',serveaddres)//添加配送地址
router.post('/viewadress',viewadress)//通过用户Id查看配送地址
router.post('/deliveryId',deliveryId)//通过id和用户id修改配送地址表中的状态
router.post('/sinState',sinState)//通过用户id修改配送地址状态
router.post('/modify',modify)//通过用户id修改配送地址状态
router.post('/distribution',distribution)//通过id和用户id修改配送地址信息
router.post('/deledistribution',deledistribution)//通过id删除配送信息
router.post('/settlement',settlement)//通过用户id和状态来查看符合条件的配送信息
router.post('/purchaseLogo',purchaseLogo)//商品购买后的标识
router.post('/logistics',logistics)//通过id获取信息
module.exports = router