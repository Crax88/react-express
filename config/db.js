const mongoose = require("mongoose");
const config = require("config");

const db = config.get("MONGO_URI");

const connectDB = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
