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

  insertUser(name) {
    return DbUtil.queryEscape(`
      INSERT INTO
        ${this.table}
        (name)
      VALUES
        (:name)
    `, {
      name: name
    });
  }
};

module.exports = new testDao();