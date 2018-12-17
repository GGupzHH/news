// 配置mysql包
// 1. 导包
const mysql = require('mysql');
// 2. 配置
const connection = mysql.createConnection({
    // 主机
    host: '127.0.0.1',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名字
    database: 'ithub'
});

// 3. 开启连接
connection.connect();

module.exports = connection;