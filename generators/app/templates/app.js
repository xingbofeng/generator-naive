const Koa = require('koa');
const app = new Koa();
const winston = require('winston');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const CommonMiddleware = require('./middleware');
const routes = require('./framework').getRootRouter(path.resolve(__dirname, 'router'));

// error handler
onerror(app);

// 记录日志信息
winston.configure({
  transports: [
    new(winston.transports.File)({
      filename: 'log/business.log'
    }),
  ],
});

app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(views());

// 路由处理逻辑
app.use(CommonMiddleware.mountApi);
app.use(routes.routes());
app.use(CommonMiddleware.notFound);

module.exports = app;
