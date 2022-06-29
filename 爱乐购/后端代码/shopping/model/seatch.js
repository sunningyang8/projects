const { query } = require('../db/query');
// 条件查询商品名称
module.exports.search = async (name) => {
    return await query("select * from newgoods where name like '%" + name + "%'");
}