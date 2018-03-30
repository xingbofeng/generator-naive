module.exports = {
  NOT_FOUND: {
    code: 404,
    msg: '请求的资源不存在'
  },
  SUCCESS: {
    code: 0,
    msg: '成功'
  },
  FAIL: {
    code: 500,
    msg: '系统开小差了'
  },
  ILLEGAL_PARAMS: {
    code: 511,
    msg: '非法请求参数'
  },
  PERMISSION_DENY: {
    code: 403,
    msg: '请求非法'
  },
  VALIDATE_LOGIN_FAIL: {
    code: 600,
    msg: '校验登录态失败'
  },
  NO_LOGIN_INFO: {
    code: 601,
    msg: '无登录态信息'
  },
  SESSION_EXPIREED: {
    code: 602,
    msg: '登录态过期'
  },
  SESSION_KICKED: {
    code: 603,
    msg: '此账号已在其它地方登录，请重新扫码登录'
  },
  NO_RIGHTS: {
    code: 604,
    msg: '没有权限'
  },
};
