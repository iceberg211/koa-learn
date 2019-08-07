const router = require('koa-router')();
const { PositiveIntegerValidator } = require('../../validators');

router.get('/v1/book', (ctx, next) => {
  ctx.body = {
    book: 'v1'
  }
});

router.post('/v1/:id/books', (ctx, next) => {
  const v = new PositiveIntegerValidator().validate(ctx);
  const id = v.get('path.id', parsed = false);
  ctx.body = 'succeuss'
})

module.exports = router;