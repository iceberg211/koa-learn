const router = require('koa-router')();

router.get('/v1/book', (ctx, next) => {
  ctx.body = {
    book: 'v1'
  }
})

module.exports = router;