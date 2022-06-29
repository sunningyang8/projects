const {topcategory,twoCategory,cateGories,cateGoriesList} = require('../model/commdity');
//一级分类
module.exports.topcategory=async (ctx)=>{
    ctx.body={
        status:200,
        topcategory:await topcategory()
    }
}
//二级分类
module.exports.twoCategory=async (ctx)=>{
    const { id } = ctx.request.query;
    // const  id  = 4;
    // console.log(111,ctx,111);
    ctx.body={
        status:200,
        twoCategory:await twoCategory(id)
    }
}
//二级分类 分类商品信息
module.exports.cateGories=async (ctx)=>{
    const { id } = ctx.request.query;
    // const  id  = 4;
    // console.log(111,ctx,111);
    ctx.body={
        status:200,
        cateGories:await cateGories(id)
    }
}
//获取二级分类 分类商品信息
module.exports.cateGoriesList=async (ctx)=>{
    // const { id } = ctx.request.query;
    // const  id  = 4;
    // console.log(111,ctx,111);
    ctx.body={
        status:200,
        cateGoriesList:await cateGoriesList()
    }
}