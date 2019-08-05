const router = require('koa-router')();

router.get('/v2/book', (ctx, next) => {
  ctx.body = {
    book: 'v2'
  }
})

module.exports = router;
