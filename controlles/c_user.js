const M_user = require('../models/m_user')
const moment = require('moment');


// 登录页显示
exports.showSignin = (request, response, next) => {
  response.render('signin.html')
}


// 用户登录
exports.handleSignin = (request, response, next) => {
  const body = request.body;
  M_user.checkEmail(body.email,
    (error, data) => {
      if (error) {
        return next(error)
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
exports.showcreateUser = (request, response, next) => {
  response.render('register.html')
}


// 创建新用户
exports.createUser = (request, response, next) => {
  var body = request.body;
  body.createdAt = moment().format();
  body.gender = '男'
  console.log(body)
  M_user.checkEmail(body.email, (error, data) => {
    if (error) {
      return next(error)
    }
    if (data[0]) {
      return response.send({
        code: 1,
        msg: '邮箱存在'
      })
    }
    M_user.checkNickname(body.nickname, (error, data) => {
      if (error) {
        return next(error)
      }
      if (data[0]) {
        return next(error)
      }
      M_user.addcreateUser(body, (error, data) => {
        if (error) {
          return next(error)
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
exports.quitLogoinuser = (request, response, next) => {
  delete request.session.user;
  response.redirect('/')
}