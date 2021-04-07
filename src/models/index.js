const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.User = require("./user.js");
// db.role = require("./role.model");


module.exports = db;
