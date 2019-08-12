const Router = require('koa-router');
const { LikeValidator, ClassicValidator } = require('../../validators');
const { Favor } = require('../../models/favor');
const { Auth } = require('../../../middleware/auth');
const { handleResult } = require('../../lib/help')

const router = new Router({ prefix: '/v1' });

router.post('/like', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });
  // 把uid放在ctx中是因为为了防止用户篡改id,千万不能让前端传递uid
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  handleResult();
});

router.post('/dislike', new Auth().m, async (ctx, next) => {
  // 对id进行转义
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });

  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  handleResult();
});

router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx);
  const artId = v.get('path.id')
  // url查询和get请求中，参数都是字符串
  const type = parseInt(v.get('path.type'));

  const art = await Art.getData(id, type);
  if (!art) {
    throw new global.errs.NotFound();
  }

  const like = await Favor.islike(artId, type, ctx.auth.uid)
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like
  }
})


router.get('/favor', new Auth().m, async ctx => {
  // 找出我最喜欢的类型
  // const favorList = await Favor.getUserFavors(ctx.auth.uid);
  // 然后再找出实体
  ctx.body = await Favor.getUserFavors(ctx.auth.uid);

})

module.exports = router;
