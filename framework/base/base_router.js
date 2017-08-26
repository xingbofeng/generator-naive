const BaseClass = require('./base_class');
const Router = require('koa-router');
const util = require('./../util/common_util');
const path = require('path');
const fs = require('fs');
const methods = require('methods');

const rootRouter = Router();
class BaseRouter extends BaseClass {
  constructor() {
    super(...arguments);
    this.routes = [];
    this.__router = Router();
    this.__router.use(async(ctx, next) => {
      let logger = this.__logger;
      logger.info(ctx.path, 'requestId>', ctx.request.header['Request-Id']);
      await next();
    });
    this.__router.use(this.filter.bind(this));
  }

  async filter(ctx, next) {
    await next();
  }

  route(router) {}

  mount(path) {
    if (!util.isString(path)) {
      throw new Error('router mount() error: the router path must be a string!')
    }
    this.__router.prefix(path);
    /**
     * 注册路由时优先级，route()方法最高，然后是this.routes中的路由，最后是按方法名注册。
     * 即，三个方法中有同path路由时，会先走route()方法，然后时this.routes，然后时方法名。
     */

    this.route.call(this, this.__router);
    // autoware method
    let methodNames = util.getAllMethodsNames(this.__proto__);
    let methodNameReg = /([a-z])([A-Z])/;

    methodNames.forEach(name => {
      let preHandleName = name.replace(methodNameReg, '$1-$2').split('-');
      let method = preHandleName[0];
      let koaRouterMethods = ['all'];
      if (methods.includes(method) || koaRouterMethods.includes(method)) {
        let path = (preHandleName[1] || '').replace(/^./, function(match) {
          return match.toLowerCase();
        });
        if (this.__router[method]) {
          this.routes.push({
            method,
            path: `/${path}`,
            middleware: this.__proto__[name]
          });
        }
      }
    });
    console.log(this.routes);
    this.routes.forEach(route => {
      let {
        method,
        path,
        middleware
      } = route;
      middleware = Array.isArray(middleware) ? middleware : [middleware];
      console.error('route', route)
      this.__router[method.toLowerCase()](path, ...middleware.map(m => m.bind(this)));
    });


    return this.__router;
  }
}

module.exports.Router = BaseRouter;
module.exports.getRootRouter = function(routersPath) {
  let autoRequireRouter = (function f(filePath, router) {
    let stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      let files = fs.readdirSync(filePath);
      files.forEach((curr) => {
        f(filePath + path.sep + curr, router);
      });
    } else if (stat.isFile()) {
      let subRouter = require(filePath);
      if (subRouter && subRouter.routes()) {
        router.use(require(filePath).routes());
      }
    }
  });
  autoRequireRouter(path.resolve(routersPath), rootRouter);
  return rootRouter;
};