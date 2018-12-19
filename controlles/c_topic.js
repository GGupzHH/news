const moment = require('moment');
const M_topic = require('../models/m_topic')

// 返回首页
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

// 跳转发布页面
exports.showCreateTopic = (request, response) => {
  response.render('topic/create.html', {
    user: request.session.user
  })
}

// 添加文章
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

// 像是文章详情页
exports.showList = (request, response) => {
  const topicId = request.params.topicId;
  M_topic.showListes(topicId, (error, data) => {
    if (error) {
      return response.send({
        code: 500,
        msg: '服务器呦呦呦呦错误了！！！！！'
      })
    }
    response.render('topic/show.html', {
      topicContetnt: data[0],
      userIdTopic: request.session.user?request.session.user.id:0
    })
  })
}

// 修改文章显示文章（待修改）
exports.modification = (request, response) => {
  const topicId = request.params.topicId;
  M_topic.showListes(topicId, (error, data) => {
    if (error) {
      return response.send({
        code: 500,
        msg: '服务器....出错了'
      })
    }
    response.render('topic/edit.html', {
      Listdaat: data[0]
    })
  })
}

// 修改跳转
exports.modificationLists = (request, response) => {
  const topicId = request.params.topicId;
  const body = request.body;
  M_topic.modificationList(topicId, body, (error, data) => {
    if (error) {
      return response.send({
        code: 500,
        msg: '服务器错了你完蛋了'
      })
    }
    response.send({
      code: 1,
      msg: '文章修改成功'
    })
  })
}


// 删除文章
exports.deleteLists = (request, response) => {
  const topicId = request.params.topicId;
  console.log(topicId)
  M_topic.deleteList(topicId, (error, data) => {
    if (error) {
      return response.send({
        code: 500,
        msg: '服务器出错额'
      })
    }
    // response.send({
    //   code: 1,
    //   msg: '删除成功'
    // })
    response.redirect("/");
  })
}