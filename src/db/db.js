const assert = require("assert");
const client = require("mongodb").MongoClient;
const config = require("../config/index.js");



let _db;

// Initializes database connection using URI handle
function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    client.connect(config.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
    },
        (err, db) => {if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: "
            + config.MONGODB_URI.split("@")[1]);
        _db = db;
        return callback(null, _db);}
    );
}

// Returns connected database object for execution
function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

module.exports = {
    getDb,
    initDb
};