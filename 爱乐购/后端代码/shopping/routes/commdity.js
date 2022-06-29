const router = require('koa-router')();
const {topcategory,twoCategory,cateGories,cateGoriesList} = require('../controller/commdity');
router.get('/topcategory', topcategory);
router.get('/twoCategory', twoCategory);
router.get('/cateGories', cateGories);
router.get('/cateGoriesList', cateGoriesList);

module.exports = router