const router = require('koa-router')();
const { PositiveIntegerValidator } = require('../../lib/validators/validators');

router.get('/v1/book', (ctx, next) => {
  ctx.body = {
    book: 'v1'
  }
});

router.post('/v1/:id/books', (ctx, next) => {
  const path = ctx.path;
  const query = ctx.request.query;
  const v = new PositiveIntegerValidator().validate(ctx);
  ctx.body = 'succeuss'
})

module.exports = router;