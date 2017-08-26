const BaseClass = require('./../framework').BaseClass;
const DbUtil = require('../util/db_util');

class testDao extends BaseClass {
  constructor(...args) {
    super(...args);
    this.table = 'test_table';
  }

  getAllData() {
    return DbUtil.queryEscape(`
      SELECT
        *
      FROM
        ${this.table}
    `);
  }
};

module.exports = new testDao();
