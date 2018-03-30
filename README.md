# generator-naive
[generator-naive](https://github.com/xingbofeng/generator-naive)取名为`naive`的目的是让你明白膜法的力量，以至于你不总在`Node.js`项目开发过程中显得那么`too young, too simple, sometimes naive.`

![](https://github.com/Vuexcited/Vuexcited/raw/master/Vuexcited.png)

## 开始

* npm install -g yo
* npm install -g generator-naive
* mkdir myapp && cd myapp
* yo naive

## 介绍
`generator-naive`是一个基于`Koa2`的`Node.js`服务端`MVC`脚手架。方便我们快速完成服务端接口开发。

![](http://oczira72b.bkt.clouddn.com/18-3-30/75542628.jpg)

## 技术栈
* `Koa2`
* `MySQL`

## 开始使用
* 在本地数据库导入示例`sql`文件，示例`sql`在`sql/too_young_too_simple.sql`。
* 更改`config/local.js`文件，设置本地`sql`用户名和密码。以保证成功连接数据库。
* 打开浏览器`localhost:3000/test`，查看返回结果。

## 特点
### 通过函数名注册路由
不需要在通过`JSON`文件配置化注册路由，将`router`和`handler`合二为一，你只需要更改`router`目录下的函数即可实现路由注册：

```javascript
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

```

项目启动后，会在控制台打印对应的路由信息如下：

![](http://oczira72b.bkt.clouddn.com/18-3-30/33562628.jpg)

在启动本地数据库之后，可以测试对应的接口详情：

![](http://oczira72b.bkt.clouddn.com/18-3-30/56060438.jpg)

### 更便捷的SQL
使用`generator-naive`，`SQL`操作则更加简单，你不用关心`MySQL`连接等相关操作，只需要在`service`层调用你写的`dao`即可。通过在`dao`层传入`DbUtil.queryEscape`的参数即可完成`SQL`查询。

```javascript
const BaseClass = require('./../framework').BaseClass;
const DbUtil = require('../util/db_util');

class testDao extends BaseClass {
  constructor(...args) {
    super(...args);
    // regis your table
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
```

### 日志
`generator-naive`使用`winston`来进行日志打印，你只需要在任何需要打印日志的地方引入`winston`即可完成日志打印。

```javascript
winston.info('too young too simple, sometimes naive');
```

### 参数校验
参数校验的目的是防止`SQL`注入，项目使用[joi](https://github.com/hapijs/joi)来进行参数校验。

1. 首先需要在`schema`目录下书写`joi`校验规则如下：

```javascript
const joi = require('joi');

module.exports = {
  postInsert: {
    userXuming: joi.number().integer().required(),
    userMobile: joi.number().integer().required(),
  }
}
```

2. 然后在每个`handler`中对入参做对应的参数校验：

```javascript
let {
  error
} = joi.validate(ctx.request.body, schema.postInsert);
if (error !== null) {
  return ctx.fail(error.name);
}
```

## TODO
- [ ] 日志打印记录完善
- [x] 防止`SQL`注入，使用`joi`校验参数
- [ ] `express` 支持
- [ ] 配置化`yeoman`