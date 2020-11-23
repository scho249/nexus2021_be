const mysql = require('mysql2')
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


// async function countStudents() {
//     try {
//       const res = await conn.execute('SELECT COUNT(*) FROM student');
//       exports.results = res;
//     } catch (err) {
//       throw err;
//     }
//   };

// conn.query('describe student',
//   function (error, results, fields) {
//     // error will be an Error if one occurred during the query
//     exports.results = results;
//     // results will contain the results of the query
//     // fields will contain information about the returned results fields (if any)
// });
