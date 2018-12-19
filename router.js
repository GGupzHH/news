const express = require('express')
const c_user = require('./controlles/c_user')
const c_topic = require('./controlles/c_topic')


const router = express.Router()

router
  .get('/signin', c_user.showSignin)
  .post('/signin', c_user.handleSignin)
  .get('/signup', c_user.showcreateUser)
  .post('/signup', c_user.createUser)
  .get('/', c_topic.showTopicList)
  .get('/topic/create', c_topic.showCreateTopic)
  .get('/signout', c_user.quitLogoinuser)
  .post('/createTopic', c_topic.handleCreateTopic)
  .get('/showList/:topicId', c_topic.showList)
  .get('/topic/:topicId/edit', c_topic.modification)
  .post('/modification/:topicId', c_topic.modificationLists)
  .get('/topic/detail/delete/:topicId', c_topic.deleteLists)
// /topic/detail/delete/8
module.exports = router