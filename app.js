const Koa = require('koa');
const app = new Koa();
const winston = require('winston');
const CommonMiddleware = require('./middleware');
const testService = require('./service/test_service');

/**
 * test database select
 */
(async function() {
  let data = await testService.test();
  console.log(data);
})();

// 记录日志信息
winston.configure({
  transports: [
    new(winston.transports.File)({
      filename: 'log/business.log'
    }),
  ],
});

// 路由处理逻辑
app.use(CommonMiddleware.notFound);

module.exports = app;
