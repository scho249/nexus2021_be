const mysql = require('mysql2/promise')
const { DB_HOST, DB_PORT, DB_SOCKET, DB_USER, DB_NAME, DB_PASS } = require('../config/index.js')

// const pool = mysql.createPool({
//   host: DB.HOST,
//   port: DB.PORT,
//   socketPath: DB.SOCKET ? `/cloudsql/${DB.SOCKET}` : null,
//   user: DB.USER,
//   password: DB.PASS,
//   database: DB.NAME,
//   connectionLimit: 10,
//   waitForConnections: true,
//   queueLimit: 0,
// });

var conn = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  socketPath: DB_SOCKET,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = conn;
// exports.promisePool = conn.promise();
