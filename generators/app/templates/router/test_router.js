const Router = require('./../framework').Router;
const testService = require('./../service/test_service');
const joi = require('joi');
const schema = require('./../schema');

const PATH = '/test';

class TestRouter extends Router {
  /**
   * getTest -> { "path": `${PATH}/insert`, "method": "GET" }
   * @param  {Object} ctx
   */
  async getTest(ctx) {
    let data = await testService.test();
    console.log(data);
    ctx.ok(data);
  }

  /**
   * getInsert -> { "path": `${PATH}/insert`, "method": "POST" }
   * @param  {Object} ctx
   */
  async postInsert(ctx) {
    let { error } = joi.validate(ctx.request.body, schema.postInsert);
    if (error !== null) {
      return ctx.fail(error.name);
    }
    let { userXuming, userMobile } = ctx.request.body;
    let data = await testService.insert(userXuming, userMobile);
    console.log(data);
    ctx.ok({});
  }
}

// mount router to path: PATH
module.exports = new TestRouter().mount(PATH);