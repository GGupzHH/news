const connection = require('../config/bd')


exports.checkEmail = (email, callback) => {

  var sqlstr = 'SELECT *FROM `users` WHERE email=?';
  connection.query(sqlstr, email, (error, data) =>{
    if (error) {
      callback(error, null)
    }else {
      callback(null, data)
    }
  })
}

exports.addcreateUser = (body, callback) => {
  var sqlstr = 'INSERT INTO `users` SET ?';
  connection.query(sqlstr, body, (error, data) => {
    if (error) {
      callback(error, null)
    }
    callback(null, data)
  })
}