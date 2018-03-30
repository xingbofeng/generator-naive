const Service = require('./../framework').Service;
const testDao = require('./../dao/test_dao');

class testService extends Service {
  async test() {
    return await testDao.getAllData();
  }

  async insert(name) {
    return await testDao.insertUser(name);
  }
};

module.exports = new testService();
