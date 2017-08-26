const Service = require('./../framework').Service;
const testDao = require('./../dao/test_dao');

class testService extends Service {
  async test() {
    return await testDao.getAllData();
  }
};

module.exports = new testService();
