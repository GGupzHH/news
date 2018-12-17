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
// 配置路由
app.use(router)




// 配置端口 开启服务器
app.listen('3000', () => {
  console.log('It is  ————————————')
})