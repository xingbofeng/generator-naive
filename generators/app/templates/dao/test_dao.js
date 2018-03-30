const BaseClass = require('./../framework').BaseClass;
const DbUtil = require('../util/db_util');

class testDao extends BaseClass {
  constructor(...args) {
    super(...args);
    this.table = 'user_info';
  }

  getAllData() {
    return DbUtil.queryEscape(`
      SELECT
        *
      FROM
        ${this.table}
    `);
  }

  insertUser(userXuming, userMobile) {
    return DbUtil.queryEscape(`
      INSERT INTO
        ${this.table}
        (user_xuming, user_mobile)
      VALUES
        (:user_xuming, :user_mobile)
    `, {
      user_xuming: userXuming,
      user_mobile: userMobile,
    });
  }
};

module.exports = new testDao();