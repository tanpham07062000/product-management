const mongoose = require("mongoose");

let isConnected = false;

module.exports.connect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ Connect Success!");
  } catch (error) {
    console.log("❌ Connect Error!");
    console.log(error.message);
    throw error;
  }
};
