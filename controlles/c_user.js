const M_user = require('../models/m_user')
const moment = require('moment');



exports.showSignin = (request, response) => {
  response.render('signin.html')
}

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

exports.showcreateUser = (request, response) => {
  response.render('register.html')
}

exports.createUser = (request, response) => {
  var body = request.body;
  body.createdAt = moment().format();
  body.gender = '男'
  M_user.addcreateUser(body, (error, data) => {
    if (error) {
      return {
        code: 500,
        mag: '服务器在在在一次出现了错误！'
      }
    }
    response.send({
      code: 200,
      mag: '注册成功！'
    })
  })
}