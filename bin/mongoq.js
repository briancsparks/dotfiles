#!/usr/bin/env node

// mongoq --name= dbname --coll= collectionname --docs= @/tmp/x.json

const sg            = require('sg-clihelp');
const mongo         = require('./utils/mongo/db');

var   ARGV          = sg.ARGV();
var   dbhost        = ARGV.host || process.env.DB_HOST || 'localhost';
const url           = `mongodb://${dbhost}:27017`;
const dbname        = ARGV.name || 'split-strike';
const collname      = ARGV.coll || 'iceburgs';
const jpath         = ARGV.path;

var   docs_         = ARGV.docs;
var   docs          = sg.safeJSONParse(docs_);

if (jpath) {
  docs = sg.deref(docs, jpath);
}

mongo.getColl(dbname, collname, function(err, coll) {
  return mongo.insertMany(coll, docs, function(err, result) {
    // callback(err, result);

    mongo.close();
  });
});

