const { MongoClient } = require("mongodb");
const connectionString1 = process.env.ATLAS_URI;
const connectionString = "mongodb+srv://SWDatabase:198700mongoDB@sw.ednai.mongodb.net/social_nw?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("social_nw");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};