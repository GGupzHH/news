const connection = require('../config/bd.js')

exports.findAllTopics = (callback) => {
  var sqlstr = 'SELECT *FROM `topics` ORDER BY id DESC';
  connection.query(sqlstr, (error, data) => {
    if (error) {
      callback(error, null)
    }
    callback(null, data)
  })
}

exports.addTopic = (body, callback) => {
  var sqlstr = 'INSERT INTO `topics` SET ?';
  connection.query(sqlstr, body, (error, data) => {
    if (error) {
      callback(error, null)
    }
    callback(null, data)
  })
}