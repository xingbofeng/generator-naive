const Service = require('./../framework').Service;
const testDao = require('./../dao/test_dao');

class testService extends Service {
  async test() {
    return await testDao.getAllData();
  }

  async insert(userXuming, userMobile) {
    return await testDao.insertUser(userXuming, userMobile);
  }
};

module.exports = new testService();
