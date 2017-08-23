const Koa = require('koa');
const app = new Koa();
const logger = console;

app.use((ctx, next) => {
  ctx.body = 'Hello World';
  logger.log(ctx);
  return next();
});

module.exports = app;
