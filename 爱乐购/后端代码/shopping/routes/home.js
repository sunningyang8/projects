const router = require('koa-router')();
const {swipers,classifyList,navList,goodsList} = require('../controller/home.js');
router.get('/swipers', swipers);
router.get('/classify', classifyList);
router.get('/nav', navList);
router.get('/goods', goodsList);
module.exports = router