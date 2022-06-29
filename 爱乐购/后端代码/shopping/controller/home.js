const { swipers,navList,classifyList,goodsList } = require('../model/home');
//轮播图
module.exports.swipers=async (ctx)=>{
    ctx.body={
        status:200,
        swipers:await swipers()
    }
}
// 分类详情组件
module.exports.classifyList=async (ctx)=>{
    ctx.body={
        status:200,
        classifyList:await classifyList()
    }
}
//宫格组件
module.exports.navList=async (ctx)=>{
    ctx.body={
        status:200,
        navList:await navList()
    }
}
//商品详情
module.exports.goodsList=async (ctx)=>{
    ctx.body={
        status:200,
        goodsList:await goodsList()
    }
}