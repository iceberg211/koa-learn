
const Router = require('koa-router')
const { Auth } = require('../../../middleware/auth');
const { Flow } = require('../../models/flow');
const { Art } = require('../../services/art');

const router = new Router({
  prefix: "/v1/classic"
})
// 获取最新的期刊，在flow表中找到index最大的一个
router.get('/latest', new Auth().m, async (ctx, next) => {
  // auth从Auth中间件写入
  // 比较权限数字大小来确定权限
  // 排序找到最大的index,先进行排序，然后找到最大的
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })

  const art = await Art.getData(flow.id, flow.type);
  // 序列化

  // art.dataValues.index = flow.index
  art.setDataValue('index', flow.index);
  ctx.body = {
    flow,
  }
});
module.exports = router;