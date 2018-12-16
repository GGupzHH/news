const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()


// 依赖文件
app.engine('html', require('express-art-template'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// 配置静态资源
app.use('/public', express.static('./public'))
// 配置第三方资源
app.use('/node_modules', express.static('./node_modules'))


// 配置路由
app.use(router);


app.listen(7000, () => {
  console.log('It is ————————————')
})