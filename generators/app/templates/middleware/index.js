const CommonRes = require('../common/common_response');
const BusinessError = require('../common/business_error');
const winston = require('winston');

module.exports = class GeneralMiddleware {
  static async notFound(ctx, next) {
    const status = ctx.status || 404;
    if (status === 404) {
      winston.info(`${ctx.status}`);
      ctx.status = status;
      ctx.body = CommonRes.NOT_FOUND;
    }
    await next();
  }

  static async mountApi(ctx, next) {
    ctx.ok = data => {
      if (data === undefined) {
        ctx.body = {
          code: CommonRes.SUCCESS.code,
          msg: CommonRes.SUCCESS.msg,
          data: {}
        };
      } else {
        let body = {
          code: CommonRes.SUCCESS.code,
          msg: CommonRes.SUCCESS.msg,
          data
        };
        if (Reflect.has(data, 'code')) {
          body.code = data.code;
        }
        if (Reflect.has(data, 'msg')) {
          body.msg = data.msg;
        }
        if (Reflect.has(data, 'data')) {
          body.data = data.data;
        }
        ctx.body = body;
      }
    };

    ctx.fail = error => {
      ctx.body = {
        code: CommonRes.FAIL.code,
        msg: error || CommonRes.FAIL.msg,
        data: {}
      };
    }
    await next();
  }

};