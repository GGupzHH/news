const M_user = require('../models/m_user')
const moment = require('moment');


// 登录页显示
exports.showSignin = (request, response) => {
  response.render('signin.html')
}


// 用户登录
exports.handleSignin = (request, response) => {
  const body = request.body;
  M_user.checkEmail(body.email,
    (error, data) => {
      if (error) {
        return response.send({
          code: 500,
          msg: '服务器出错！'
        })
      }
      if (data.length === 0) {
        return response.send({
          code: 1,
          msg: '邮箱地址不存在'
        })
      }
      if (data[0].password !== body.password) {
        return response.send({
          code: 2,
          msg: '密码错误！'
        })
      }
      request.session.user = data[0];
      response.send({
        code: 200,
        msg: "可以登录了!"
      })
    })
}


// 注册页面
exports.showcreateUser = (request, response) => {
  response.render('register.html')
}


// 创建新用户
exports.createUser = (request, response) => {
  var body = request.body;
  body.createdAt = moment().format();
  body.gender = '男'
  console.log(body)
  M_user.checkEmail(body.email, (error, data) => {
    if (error) {
      return response.send({
        code: 500,
        mag: '服务器在在在一次出现了错误11111！'
      })
    }
    if (data[0]) {
      return response.send({
        code: 1,
        msg: '邮箱存在'
      })
    }
    M_user.checkNickname(body.nickname, (error, data) => {
      if (error) {
        return response.send({
          code: 500,
          mag: '服务器在在在一次出现了错误22222222！'
        })
      }
      if (data[0]) {
        return response.send({
          code: 2,
          msg: '用户名存在'
        })
      }
      M_user.addcreateUser(body, (error, data) => {
        if (error) {
          return response.send({
            code: 500,
            mag: '服务器在在在一次出现了错误3333333333！'
          })
        }
        response.send({
          code: 200,
          mag: '注册成功！'
        })
      })
    })
  })
}


// 用户退出
exports.quitLogoinuser = (request, response) => {
  delete request.session.user;
  response.redirect('/')
}