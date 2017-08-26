class Util {
  static getAllMethodsNames(obj = {}) {
    let methodsNames = Object.getOwnPropertyNames(obj)
      .filter(name => {
        return typeof obj[name] === 'function';
      });
    return methodsNames;
  }

  /**
   * Check if `obj` is a generator.
   *
   * @param {Mixed} obj
   * @return {Boolean}
   */

  static isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
  }

  /**
   * Check if `obj` is a generator function.
   *
   * @param {Mixed} obj
   * @return {Boolean}
   */

  static isGeneratorFunction(obj) {
    let constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return Util.isGenerator(constructor.prototype);
  }

  static isAsyncFunction(obj) {
    let constructor = obj.constructor;
    if (!constructor) return false;
    if ('AsyncFunction' === constructor.name || 'AsyncFunction' === constructor.displayName) return true;
    return false;
  }

  static getAllMethodsNames(obj = {}) {
    let methodsNames = Object.getOwnPropertyNames(obj)
      .filter(name => {
        return typeof obj[name] === 'function';
      });
    return methodsNames;
  }

  static getAllInstanceMethodsNames(obj = {}) {
    let methodsNames = Object.getOwnPropertyNames(obj)
      .filter(name => {
        return typeof obj[name] === 'function' && name !== 'constructor';
      });
    return methodsNames;
  }

  static is(type, obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toUpperCase() === type.toUpperCase()
  }

  static isString(obj) {
    return Util.is('string', obj)
  }
}

module.exports = Util;