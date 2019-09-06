
const sg            = require('sg-clihelp');
const MongoClient   = require('mongodb').MongoClient;
var   ARGV          = sg.ARGV();
var   dbhost        = ARGV.host || process.env.DB_HOST || 'localhost';
const url           = `mongodb://${dbhost}:27017`;

var   db, client;
var   colls = {};

var   data = ARGV.data;

module.exports.getColl = getColl;
module.exports.insertMany = insertMany;
module.exports.close = close;

function getColl(dbname, collname, callback) {
  return MongoClient.connect(url, {useNewUrlParser:true}, (err, client_) => {
    if (err) {
      console.error(err);
      return;
    }

    client      = client_;
    db          = client.db(dbname);
    const coll  = db.collection(collname);
    colls[collname] = coll;

    return callback(err, coll);
  });
}

function insertMany(coll, docs, callback) {

  return coll.insertMany(docs, function(err, result) {
    callback(err, result);
  });
}

function close() {
  if (db) {
    client.close();
  }
}
