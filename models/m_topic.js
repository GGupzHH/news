const connection = require('../config/bd.js')


// 倒叙排列查询文章
exports.findAllTopics = (callback) => {
  var sqlstr = 'SELECT *FROM `topics` ORDER BY id DESC';
  connection.query(sqlstr, (error, data) => {
    if (error) {
      return callback(error, null)
    }
    callback(null, data)
  })
}


// 添加文章
exports.addTopic = (body, callback) => {
  var sqlstr = 'INSERT INTO `topics` SET ?';
  connection.query(sqlstr, body, (error, data) => {
    if (error) {
      callback(error, null)
    }
    callback(null, data)
  })
}

// 根据文章id查询文章信息
exports.showListes = (topicId, callback) => {
  const sqlstr = 'select *from `topics` where id =?'
  connection.query(sqlstr, topicId, (error, data) => {
    if (error) {
      return callback(error, null)
    }
    callback(null, data)
  })
}

//
// 修改文章详情
exports.modificationList = (topicId, body, callback) => {
  const sqlstr = 'UPDATE `topics` SET ? WHERE id=?';
  connection.query(sqlstr, [body, topicId], (error, data) => {
    if (error) {
      return callback(error, null)
    }
    callback(null, data)
  })
}

// 删除文章
exports.deleteList = (topicId, callback) => {
  const sqlstr = 'delete from `topics` where id =?'
    // 'DELETE FROM `topics` WHERE id = ?';
  connection.query(sqlstr, topicId, (error, data) => {
    if (error) {
      return callback(error, null)
    }
    callback(null, data)
  })
}