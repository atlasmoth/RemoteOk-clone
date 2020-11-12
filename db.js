const mongoose = require("mongoose");

const initDb = () =>
  mongoose.connect(process.env.MONGO_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

module.exports = initDb;
