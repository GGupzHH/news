### 项目-第一天-笔记

#### 11-项目-功能演示

1. 用户
   1. 用户登录
   2. 用户注册
   3. 用户退出
2. 文章/话题
   1. 文章列表
   2. 创建新文章
   3. 编辑文章
   4. 删除文章
3. 优化

#### 12-项目-项目准备-git 版本控制

1. 新建 news57

   1. npm init -y
   2. npm i express

2. 新建 .gitignore (git 的排除/忽略文件)

3. git 操作

   ```bash
   git init
   git status
   git add .
   git commit -m "zhushi"
   git remote add origin https://github.com/lzz-dragon/news57.git 关联仓库
   git push -u origin master
   ```

4. 继续 git 操作时

   ```bash
   git status
   git add .
   git commit -m ""
   git push
   ```

#### 13-项目-项目准备-项目文件组成

1. app.js 入口文件
2. router.js 路由
3. controllers
   1. c_user.js 相当于 handle.js 实现用户功能相关的方法
4. views/视图
5. public/ 静态资源

> git add .
>
> git commit -m ""
>
> git push(可以在完成功能之后一起 push)

#### 14-项目-登录-功能拆分

1. 渲染登录页面 完成
2. 客户端发送表单请求
3. 服务端处理该表单请求
4. 客户端处理服务端返回的响应

#### 15-项目-登录-渲染登录页面-导入视图素材-渲染视图

1. node 项目页面素材提前准备好

2. 把 02-其他资源/signin.html + img/ +css/ 放在 views 和 publics

3. npm i jquery bootstrap@3.3.7

4. 在 app.js 统一配置资源

   ```js
   // 配置静态资源
   app.use('/public', express.static('./public'))

   // 配置第三方资源
   app.use('/node_modules', express.static('./node_modules'))
   ```

#### 15-项目-登录-渲染登录页面-安装第三方包-配置静态资源

1. npm i art-tempalte express-art-tempalte
2. 配置 app.engine('html', require('express-art-template'));
3. router.js 增加路由配置 router.get("/signin",找方法)
4. c_user.js res.render("V");

### 项目-第二天-笔记

#### 01-项目-登录-客户端发送表单请求

1. 绑定事件 submit
2. 取消默认行为
3. 获取表单数据
4. 发送 ajax

```js
// 客户端发送表单提交
$('#signin_form').on('submit', function(e) {
  // 1. 阻止默认行为
  e.preventDefault()
  // 2. 获取表单数据
  var formdata = $(this).serialize()
  // console.log(formdata);

  // 3. 发送ajax -> post
  $.post('/signin', formdata, function(data) {
    // data 服务端返回响应
    console.log(data)
  })
})
```

#### 02-项目-登录-服务端处理表单-获取表单数据

1. npm i body-parser
2. app.js 配置包
3. router.js 增加请求监听
4. c_user.js 实现方法
5. 获取表单元素 req.body
6. npm i mysql
7. 配置包 + 新建数据库+导表

#### 03-项目-登录-服务端处理表单-验证邮箱

1. 查询数据库 验证邮箱
2. 如果 err 返回 500 的响应
3. 如果 data 为[] 邮箱不存在 返回 1 的响应
4. 如果 data 不为空 邮箱存在

```js
 const sqlstr = 'SELECT *FROM `users` WHERE email=?';
    connection.query(sqlstr, body.email, (err, data) => {
        if (err) {
            // throw err;
            return res.send({
                code: 500,
                msg: "服务器出现错误!"
            })
        }
        // data 数组
        // 如果邮箱不存在
        if (data.length === 0) {
            // console.log("邮箱不存在啊!");
            return res.send({
                code: 1,
                msg: "邮箱不存在"
            });
        }
```

> res.send({}) 客户端请求 data 也是对象

#### 04-项目-登录-服务端处理表单-验证密码-返回响应

> data 类型是数组 data[0].password===body.password

```js
if (data[0].password !== body.password) {
  return res.send({
    code: 2,
    msg: '密码不正确'
  })
}

// 4. 返回200的响应
res.send({
  code: 200,
  msg: '可以登录了!'
})
```

#### 05-项目-登录-客户端处理服务端返回的响应

1. data.code===200 客户端重定向到列表页
2. 其他情况 alert(data.msg)
   > window.location.href = "/";

#### 06-项目-登录-优化-提取模型-m_user.js

> 目的: 把 c_user.js 中数据库操作的部分提取模块

1. 新建 models/m_user.js
2. m_user.js 导入 mysql 配置
3. m_user.js 导出方法
4. m_user.js sql 语句+回调函数(err,data)
5. c_user.js 导入 m_user.js
6. c_user.js 使用数据库操作的结果

#### 07-项目-登录-优化-提取-db_config

> 目的: 把 m_user.js 中 mysql 包配置的提取
> 新建 config/db_config.js 模块

#### 08-项目-MVC 设计模式-引出

#### 09-项目-MVC 设计模式-各司其职

> M:
> V:
> C:业务逻辑+宏观调控
> 见 xmind

#### 10-项目-文章-文章列表-渲染列表页

1. 登录 html 中重定向 -> 发送请求/ GET
2. router.js 增加请求的监听 找到控制器 c_topic 的方法
3. controllers/c_topic.js 实现方法 showTopicList
4. 客户端要视图->控制器向 View 要视图->导入 UI 素材
5. c_topic.js res.render(V);

#### 11-项目-文章-文章列表-数据处理

> 控制器渲染视图时 用数据 , 让模型文件去操作数据库 返回结果
> res.render("index.html",{topics:data})
> 在视图文件 index.html 通过模板引擎语法使用数据 topics

#### 12-项目-文章-文章列表-express-session-保存用户信息

> 在列表页展示当前登录用户的用户名
> 在登录页 登录成功时 保存记录正确的用户信息->session

1. npm i express-session
2. app.js 导包
3. app.js 配置包 -> req.session 对象

```js
// 在c_user.js 登录成功时
// 使用req.session保存正确的用户信息
req.session.user = data[0]
```

#### 13-项目-文章-文章列表-登录和注册的显示与隐藏

> 如果登录了 显示头像和发布新文章的按钮
> 如果没登录 显示登录和注册

1. index.html->header.html {{if user}}
2. c_topic res.render(V,{topics:data,user:req.session.user})

#### 14-项目-文章-文章列表-显示当前用户名

> 在登录的状态下, 显示当前用户昵称 nickname
> header.html {{user.nickname}}

#### 15-项目-文章-文章列表-发布新文章-渲染页面

1. 视图 header.html a 发送请求 "/topic/create" -> 要视图
2. router.js 配置 找控制器方法 c_topic
3. 控制器 实现方法 res.render("topic/create.html");

#### 16-项目-文章-文章列表-发布新文章-客户端发送表单请求

> 视图 create.html 发送 post 请求

#### 17-项目-文章-文章列表-发布新文章-服务端处理表单请求

1. router.js 增加监听
2. C 实现方法
   1. 获取表单数据
   2. 让 M 操作数据库 添加新数据
   3. 返回响应 200

#### 18-项目-文章-文章列表-发布新文章-客户端处理服务端返回的响应

> data.code===200 重定向到列表页 /
> 数据库查询的结果 倒序排序

#### 19-项目-文章-文章列表-持久化存储用户信息

> express-session 保存的用户信息 每次重启服务器 数据就失效
> req.session.user

1. 在登录成功时 把 req.session.user 写入数据库中
2. 在使用 时 查询数据库
   > 持久化存储 -> mysql 中 sessions 表中
   > express-mysql-session -> 看文档 -> 结果是 req.session 的数据保存在数据库中

> 数据库表中 sessions 保存的是用户信息数据

#### 20-项目-文章-文章列表-设置话题的-createdAt

> 给新文章添加 createdAt
> body.createdAt = moment().format();
> 注意: moment 处理时间 和 node 没关系

#### 21-项目-文章-文章列表-设置话题的创建者-userId

> 目的:为了区分文章的创建者 给文章设置 userId 字段
> 文章.userId = 当前登录用户的.id
> body.userId = req.session.user.id;

### 项目-第三天-笔记

#### 01-项目-用户-用户退出

1. V header.html a href="/signout"
2. router 增加路由监听 找到 C 的方法
3. C c_user 实现 handleSignout
4. 在 handleSignout 方法中 ->清除 delete session + 重定向到登录页
   > 服务端重定向适用于同步请求

#### 02-项目-文章-文章详情-渲染页面

1. V index.html a href="/detail/topic"
2. router 增加路由监听 找到 C 的方法
3. C c_topic 实现 showTopicDetail
4. 在 showTopicDetail res.render(V(topic/show.html))

#### 03-项目-文章-文章详情-动态路由

1. V index.html a href = "/detail/topic/{{$value.id}}"
2. router router.get("/detail/topic/:形参名 topicID") 找 C 方法
3. C c_topic 实现 showTopicDetail
4. 在 showTopicDetail 获取当前动态 url 的参数值 const topicID = req.params.topicID;

#### 04-项目-文章-文章详情-处理数据

1. V show.html 要用数据 该数据来源找 C 中找
2. C c_topic 让 M 根据 topicID 找数据 返回结果
3. M m_topic sql 语句查询数据库
4. C c_topic res.render(V,{topic:data[0]});
5. V show.html 模板引擎语法 使用该数据{{topic.title}}

#### 05-项目-文章-文章详情-处理数据不存在的情况

> 在浏览文章列表的同时 该文章作者 把某个文章 A 删除,进入到 A 文章的详情页->提示该文章已经删除

1. V show.html {{if !topic}} 不存在 渲染对象的标签 否则 渲染其他标签
2. C c_topic data.length===0 的情况 不需要返回响应 -> 返回空对象的方法{topic:data[0]}

#### 06-项目-文章-文章详情-编辑和删除按钮的显示与隐藏

> 判断 当前登录的用户 和 该文章的作者

1. C c_topic 渲染详情页面时 传 sessionUserId:req.session.user.id

```js
res.render('topic/show.html', {
  topic: data[0],
  sessionUserId: req.session.user ? req.session.user.id : 0
})
```

2. V show.html {{if sessionUserId===topic.userId}}

#### 07-项目-文章-文章详情-删除话题

1. V show.html 找 a href = "/topic/{{topic.id}}/delete"
2. router 增加路由配置 动态路由 .get("/topic/:topicID/delete") 找 C 的方法;
3. C c_topic 实现 handleDeleTopic 让 M 删除数据
4. M m_topic 操作数据库 根据 topicID 删除数据
5. C c_topic 删除成功 重定向到列表页

#### 08-项目-文章-文章详情-编辑话题-渲染页面

1. V show.html 找编辑按钮 a href = "/topic/{{topic.id}}/edit"
2. router 动态路由 .get("/topic/:topicID/edit") 找 C
3. C c_topic 实现方法 res.render("topic/edit.html")

#### 09-项目-文章-文章详情-编辑话题-处理表单

> 给 edit.html 渲染数据

1. C c_topic 在 showEditTopic 中 让 M 根据 topicID 查数据
2. C c_topic res.render("topic/edit.html",{topic:data[0]})
3. V edit {{topic.title}}
   > 客户端发请求
   > `edit.html`

```js
$('form').on('submit', function(e) {
  e.preventDefault()
  var formdata = $(this).serialize()
  // 模板引擎的语法{{}}也可以在js字符串去使用
  var url = '/edit/topic/' + '{{topic.id}}'
  // console.log(url);

  $.post(url, formdata, function(data) {
    console.log(data)
    if (data.code === 200) {
      window.location.href = '/detail/topic/' + '{{topic.id}}'
    }
  })
})
```

`router.js`

```js
.post('/edit/topic/:topicID', c_topic.handleEditTopic);
```

`c_topic`

```js
exports.handleEditTopic = (req, res) => {
  // 获取表单数据
  const body = req.body
  // 获取当前要编辑文章的topicID
  const topicID = req.params.topicID

  // 让M操作数据库: 根据topicID 修改数据
  M_topic.editTopicById(topicID, body, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: '服务器错误'
      })
    }
    res.send({
      code: 200,
      msg: '编辑成功'
    })
  })
}
```

`m_topic.js`

```js
exports.editTopicById = (topicID, body, callback) => {
  const sqlstr = 'UPDATE `topics` SET ? WHERE id=?'
  connection.query(sqlstr, [body, topicID], (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, data)
  })
}
```

> 在视图文件的 js 部分 也可以使用{{topic.id}}
> 给隐藏标签 设置属性值 value="{{topic.id}}" -> js 中获取 DOM 元素的值

#### 10-项目-用户-用户注册-渲染注册页面

1. V signin.html a href = "/signup"
2. router.js 配置请求 找 C 的方法
3. C c_user.js 实现 showSignup
4. 在 c_user 的 showSignup 内部 res.render("signup.html");

#### 11-项目-用户-用户注册-客户端发送表单请求

`signup.html`

```js
$('#signup_form').on('submit', function(e) {
  e.preventDefault()
  var formdata = $(this).serialize()
  $.post('/signup', formdata, function(data) {
    console.log(data)
  })
})
```

> form 默认提交 是同步请求 -> 整个页面刷新
> ajax 异步 -> 局部刷新

#### 12-项目-用户-用户注册-服务端处理表单-获取表单数据

1. router.js 配置请求 找 C 的方法
2. C c_user 获取表单数据 req.body

#### 13-项目-用户-用户注册-服务端处理表单-验证邮箱和昵称-返回响应

1. 获取表单数据
2. 让 M 去验证邮箱,如果邮箱不存在->
3. 让 M 验证昵称 -> 如果昵称不存在->
4. 让 M 添加新用户 -> 成功
5. 返回 200 响应

```js
// 1. 获取表单数据
const body = req.body

// 2. 先验证邮箱是否存在(body.email===数据库)
// 如果存在 返回响应
M_user.checkEmail(body.email, (err, data) => {
  if (err) {
    return res.send({
      code: 500,
      msg: '服务器错误'
    })
  }
  // 如果昵称存在 返回响应
  if (data[0]) {
    return res.send({
      code: 1,
      msg: '邮箱存在'
    })
  }

  // 3. 如果邮箱不存在 -> 验证昵称
  M_user.checkNickname(body.nickname, (err, data) => {
    if (err) {
      return res.send({
        code: 500,
        msg: '服务器错误'
      })
    }
    // 如果昵称存在
    if (data[0]) {
      return res.send({
        code: 2,
        msg: '昵称存在'
      })
    }
    // 4. 如果昵称不存在->可以添加新用户了
    M_user.addUser(body, (err, data) => {
      if (err) {
        return res.send({
          code: 500,
          msg: '服务器错误'
        })
      }

      // 5. 返回200响应
      res.send({
        code: 200,
        msg: '注册成功'
      })
    })
  })
})
```

#### 14-项目-用户-用户注册-客户端处理响应

> 如果添加成功->重定向登录页面

```js
if (data.code === 200) {
  // 注册成功 来到登录页面
  window.location.href = '/signin'
} else {
  alert(data.msg)
}
```

#### 15-进阶-中间件-概念

> 中间件:处理任何请求和响应 :处理请求和响应的每个环节称之为中间件
> 中间件是 express 框架给我们提供的功能
> `项目中使用的中间件`
> req -> body-parser(req.body) -> 下一个中间件(req.session)->

1. body-parser 就是中间件 给 req 增加属性 body
2. express-art-template 中间件 给 res 增加方法 render()
3. express-session 也是中间件 给 req 增加 session
4. express.static();也是中间件 link href=""
5. app.get("/",cb(req,res)=>{}); 也是中间件

### 项目-第四天-笔记

#### 01-进阶-中间件-请求日志

1. app.use((req,res,next)=>{}) 处理所有请求
2. 处理函数中 next 类型是函数 next()-> 调用下一个能匹配到的中间件
3. req.methods req.path
4. app.get("/",(req,res)=>{});

#### 02-进阶-中间件-API

1. app.use(处理函数(req,res,next)=>{});
2. app.get("标识",处理函数(req,res,next)=>{});
3. app.post("标识",处理函数(req,res,next)=>{});
   > 补充 app.use("/x",处理函数(req,res,next)=>{}); 处理所有标识以/x 开头

#### 03-进阶-中间件-执行顺序

> 中间件的执行是按照中间的代码位置从前往后一一匹配

1. 如果匹配到 执行该中间件
2. 如果没匹配到 当前中间件直接跳过,继续匹配后面的中间件
   > 注意:A 中间件如果匹配到,需要调用 next(),后面的中间件才会继续匹配

#### 04-进阶-中间件-给 req 增加属性

> 在第一个能匹配到的中间件 给 req 增加成员 fn
> 在下一个能匹配到的中间的处理函数中可以使用 req.fn

#### 05-进阶-中间件-next 参数

1. 每个中间件的处理函数都有一个 next 参数
2. next 参数类型是函数
3. next()作用: 继续匹配下一个中间件

#### 06-进阶-中间件-express-static 方法的实现

> 自己实现 express.static()这个中间件的作用
> app.use(static("./public"));

```js
function static(filepath) {
  return (req, res, next) => {
    // console.log(req.path);
    const path = req.path
    fs.readFile(filepath + path, 'utf8', (err, data) => {
      if (err) {
        //    throw err;
        // 如果来到这里 证明 /a->res.send("aaaa");
        next()
      }
      // 如果来到这
      res.send(data)
    })
  }
}

app.use(static('./public'))
```

#### 07-进阶-中间件-next 传参数

> try-catch-

```js
try {
  // 可能出现错误的代码
  JSON.parse('abcedf')
} catch (error) {
  console.log('这里捕获了错误对象')

  // console.log(error);
  // 可以捕获到try里面的错误对象
  next(error)
}
```

> next(err)

1. next()可以传参数
2. next 的实参要求是错误对象
3. next(err)如果传了错误对象,会直接来到处理函数有 4 个参数的中间
4. app.use((err,req,res,next)=>{统一处理所有错误 此时 err 就是 next(err)的实参});

#### 08-进阶-中间件-作用和分类

> 作用

1. 只要能匹配到 就可以执行任何代码
2. 修改 req 和 res req.xx=?
3. 发送响应 res.send();
4. 可以调用下一个中间件 next()
   > 分类
5. 应用程序级别的中间件 app.use();
6. 路由中间件 router.get();
7. 错误处理中间件 (err,req,res,next)=>{}
8. 内置中间件 epxress.static()
9. 第三方中间件 比如 body-parser 给 req.body

#### 09-项目-统一处理-500 错误

1. 找到每个 C 中的 500 错误位置
2. 先把 msg:"服务器错了"->err.message
3. ctrl+d 选中一样的片段 进行替换 next(err)
4. 所有的处理函数补充 next (req,res,next)
5. app.js 挂载路由下面增加 4 个参数的中间件
6. app.js 中 在错误处理的中间件中 统一处理所有 500 错误

```js
// -> router.js 中配置某个请求->找C的方法->next(err);
app.use(router)

// 统一处理错误的中间件
app.use((err, req, res, next) => {
  res.send({
    code: 500,
    msg: err.message
  })
})
```

> 快捷键

1. 行尾跳行首 fn+←
2. 跳单词 ctrl+shift+←
3. 垂直跳并且选中 ctrl+alt+↑
4. ctrl+b
5. ctrl+alt+←
6. 来到文件目录 shift+alt+r

#### 10-项目-404-页面处理

> 当用户的 url 输入错误 -> 返回友好 404 页面

```js
app.use(router)

// 渲染404页面
app.use((req, res, next) => {
  res.render('404.html')
  next()
})
```

> 注意 : 404 的渲染要放在挂载路由后面

#### 11-项目-请求日志

> 在控制台输出所有请求的日志(信息->请求方式/标识/耗时)
> 使用第三方中间件 morgan
> 看文档

1. npm i morgan
2. 在 app.js 导入 包
3. app.use(morgan());

#### 12-项目-公共成员的使用

> app 对象有一个属性叫 locals 对象,可以动态添加成员 num
> num 数据可以在任何页面 html 中 通过模板引擎的语法去使用{{num}}
> 统一处理所有 sessionUser 的赋值
> 位置: 在 session 包配置之后并且在挂载路由之前,写一个中间件
> 注意: next()不要忘记调用

```js
// session配置
// 公共成员赋值的中间件
app.use((req, res, next) => {
  app.locals.sessionUser = req.session.user
  next()
})
// 挂载路由
app.use(router)
```

#### 13-扩展-ES6-扩展运算符

> ...容器(数组或者对象)

```js
// ES6 扩展运算符
// ...容器名字(容器可以是数组或者对象)
// 场景:
//
const arr1 = [1, 2]
const arr2 = [3, 4]
// [1,2,3,4];
// arr1.concat(arr2);
const arr = [...arr1, ...arr2]
// console.log(arr);

const per1 = {
  name: '啦啦'
}
const per2 = {
  age: 17
}

const per = {
  ...per1,
  ...per2
}
console.log(per)
```
