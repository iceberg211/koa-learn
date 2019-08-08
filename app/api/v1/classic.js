
const Router = require('koa-router')
const router = new Router({
  prefix: "/v1/classic"
})
const { Auth } = require('../../../middleware/auth');

// 阻止请求
router.get('/latest', new Auth().m, async (ctx, next) => {
  // auth从Auth中间件写入
  // 比较权限数字大小来确定权限
  ctx.body = ctx.auth.uid;

})


module.exports = router;