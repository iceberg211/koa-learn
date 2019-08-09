const Router = require('koa-router');
const { LikeValidator } = require('../../validators');
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
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  });

  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  handleResult();
});

module.exports = router;
