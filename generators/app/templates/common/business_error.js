class BusinessError extends Error {
  constructor(obj) {
    super();
    this.code = obj.code;
    this.msg = obj.msg;
  }
};

module.exports = BusinessError;
