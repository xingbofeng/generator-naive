const DbUtil = require('../util/db_util');

class testDao {
  constructor() {
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
