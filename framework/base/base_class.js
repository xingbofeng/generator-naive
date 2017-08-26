const EventEmitter = require('events');
const winston = require('winston');
const util = require('./../util/common_util');

class BaseClass extends EventEmitter {
  // 初始化logger对象
  constructor(...args) {
    super(...args);
    // 挂载logger对象
    this.__logger = winston;
    // 记录参数执行时间
    let methodsNames = util.getAllMethodsNames(this.__proto__);
    // 对async、generator、普通函数分别处理日志
    methodsNames.forEach(name => {
      if (name === 'constructor') return;
      let fn = this.__proto__[name];
      let logMethodName = `${this.constructor.name}::${name}() > `;
      if (util.isGeneratorFunction(fn)) {
        this.__proto__[name] = (function*(...args) {
          let now = Date.now();
          let result = yield fn.apply(this, args);
          this.__logger.info(logMethodName, Date.now() - now, 'ms');
          return result;
        }).bind(this);
      } else if (util.isAsyncFunction(fn)) {
        this.__proto__[name] = (async function(...args) {
          let now = Date.now();
          let result = await fn.apply(this, args);
          this.__logger.info(logMethodName, Date.now() - now, 'ms');
          return result;
        }).bind(this);
      } else {
        this.__proto__[name] = (function(...args) {
          let now = Date.now();
          let result = fn.apply(this, args);
          this.__logger.info(logMethodName, Date.now() - now, 'ms');
          return result;
        }).bind(this);
      }
    });
  }

  /**
   * 初始化logger，使其在打log的时候带上方法名字
   * @example __initLogger(methodName[, arg1[, arg2[, ...]]])
   * @param {String} methodName 方法名
   * @param {[String]} args 其他信息
   * @returns {{info, debug, warn, error}}
   */
  initLogger(methodName, ...args) {
    let prefix = `${this.constructor.name}::${methodName}() > `;
    return {
      info: this.__logger.info.bind(this.__logger, prefix, ...args),
      debug: this.__logger.debug.bind(this.__logger, prefix, ...args),
      warn: this.__logger.warn.bind(this.__logger, prefix, ...args),
      error: this.__logger.error.bind(this.__logger, prefix, ...args)
    }
  }
}

module.exports = BaseClass;