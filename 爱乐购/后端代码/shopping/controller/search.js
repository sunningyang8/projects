const { search } = require('../model/seatch');
//条件查询语句
module.exports.search=async (ctx)=>{
    const { name } = ctx.request.query;
    // console.log(ctx.request.query,111)
    // console.log(name,"zhang")
    // const recor=await search(name)
    // console.log(recor,222)
    ctx.body={
        status:200,
        search:await search(name)
    }
}