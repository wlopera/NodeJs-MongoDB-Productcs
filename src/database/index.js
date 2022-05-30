const { MongoClient } = require("mongodb");
const debug = require("debug")("app:database");
const { Config } = require("../config/index");

let connection = null;
module.exports.Database = (collection) =>
  new Promise(async (res, rej) => {
    try {
      // Patron sigleton
      if (!connection) {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("Nueva conexión realizaada con MongoDB Atlas");
      }
      debug("Retornando la colección requerida");
      const db = connection.db(Config.mongoDbname);
      res(db.collection(collection));
    } catch (error) {
      rej(error);
    }
  });
