const Router = require('./../framework').Router;
const testService = require('./../service/test_service');

class TestRouter extends Router {
  async getTest(ctx) {
    let data = await testService.test();
    console.log(data);
    ctx.ok(data);
  }

  async getInsert(ctx) {
    let name = ctx.query.name;
    let data = await testService.insert(name);
    console.log(data);
    ctx.ok({});
  }
}

module.exports = new TestRouter().mount('/test');
