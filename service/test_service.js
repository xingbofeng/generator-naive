const testDao = require('./../dao/test_dao');

class testService {
  async test() {
    return await testDao.getAllData();
  }
};

module.exports = new testService();
