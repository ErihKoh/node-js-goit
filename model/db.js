const { MongoClient } = require("mongodb");
require("dotenv").config();
const uriDB = process.env.URI_DB;

const db = MongoClient.connect(uriDB, {
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connect for db closed and app termination");
  process.exit(1);
});

module.exports = db;
