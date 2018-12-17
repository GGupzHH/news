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
  .post('/createTopic', c_topic.handleCreateTopic)


module.exports = router