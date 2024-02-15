const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
      return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        database = client;
        callback(null, database);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  const getDatabase = () => {
    if (!database) {
      throw Error('Db not initialized');
    }
    return database;
  };
  
  module.exports = {
    initDb,
    getDatabase,
  };