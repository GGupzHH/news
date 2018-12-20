const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ithub'
};
const sessionStore = new MySQLStore(options);

// 实例化express
const app = express()

// 配置模板引擎和body
app.engine('html', require('express-art-template'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// 公开第三方资源
app.use('/public', express.static('./public'))
app.use('/node_modules', express.static('./node_modules'))

// 配置session
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 设置中间件  然后使用node中的一个全局变量 在这里使用就可以在页面中的模板引擎中使用
app.use((request, response, next) => {
    // locals是全局对象  就可以直接在页面中的moan引擎中使用了
    app.locals.sessionUser = request.session.user;
    next(); // 这里使用next是因为要传递给后面的路由
})


// 配置路由
app.use(router)


// 设置404 页面  当上面的路由没有匹配的时候  到这里   这时候就返回
// 404页面  app.use(() => {响应任何表示}符)
app.use((request, response, next)=> {
    response.render('404.html');
    next();
})

// 返回错误对象    next可以有一个参数  但是这个参数只能是前面所有的错误对象
// next的作用
//          每一个中间件是不能相互联系的   如果上一个中间件标识已经匹配了， 那么后面的中间件就不会响应   但是我们想让后面的中间件响应  就需要在上一个中间件里面写next()
app.use((error, request, response, next) => {
    res.send({
        code: 500,
        msg: err.message
    });
})


// 配置端口 开启服务器
app.listen('3000', () => {
  console.log('It is  ————————————')
})