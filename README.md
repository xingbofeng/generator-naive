# too-young-too-simple-backend
The BackEnd of `Too Young Too Simple` Application.

## 目录
```
.
├── README.md
├── package.json
├── app.js // 项目入口
├── bin
│   └── www // web server 入口
├── common // 公用response参数处理
│   ├── business_error.js
│   └── common_response.js
├── config // 项目配置
│   ├── formal.js
│   ├── index.js
│   ├── local.js
│   ├── pre.js
│   └── test.js
├── dao // 数据访问对象
│   └── test_dao.js
├── framework // 项目基础类
│   ├── base
│   ├── index.js
│   └── util
├── log // 日志记录
│   └── business.log
├── middleware // 工程级公用中间件
│   └── index.js
├── router // 路由挂载
│   └── test_router.js
├── schema // 参数校验
│   └── index.js
├── service // 工程级服务
│   └── test_service.js
├── task // 定时任务
├── sql // DB设计
├── util // 公用工具类
│   ├── common.js
│   └── db_util.js
└── view // 前端模板
    ├── error.ejs
    └── index.ejs
```