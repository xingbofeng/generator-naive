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
};