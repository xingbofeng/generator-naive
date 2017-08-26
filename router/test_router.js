const Router = require('./../framework').Router;
const testService = require('./../service/test_service');

class TestRouter extends Router {
  async getTest(ctx) {
    let data = await testService.test();
    console.log(data);
    ctx.ok(data);
  }
}

module.exports = new TestRouter().mount('/test');
