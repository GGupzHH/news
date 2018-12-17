const moment = require('moment');
const M_topic = require('../models/m_topic')


exports.showTopicList = (request, response) => {
  M_topic.findAllTopics((error, data) => {
    if (error) {
      return {
        cade: 500,
        mag: '服务器又出错了'
      }
    }
    response.render('index.html', {
      topics: data,
      user: request.session.user
    })
  })
}


exports.showCreateTopic = (request, response) => {
  response.render('topic/create.html', {
    user: request.session.user
  })
}

exports.handleCreateTopic = (request, response) => {
  // console.log(request.body)

  var body = request.body
  // createdAt
  body.createdAt = moment().format();
  // userId (当前添加的新文章的创建者是谁) 文章的userId = 当前登录用户的id值
  body.userId = request.session.user.id;
  M_topic.addTopic(body, (error, data) => {
    if (error) {
      return {
        code: 500,
        mag: '服务器再一次出错了！'
      }
    }
    response.send({
        code: 200,
        msg: "添加成功"
    });
  })
}

