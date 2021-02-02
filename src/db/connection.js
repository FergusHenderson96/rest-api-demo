const mongoose = require("mongoose");
//imports mongooose
require("dotenv").config();
//

const connection = async () => {
  //async function which trys to connect to mongoose and will await connection before continuing with function 
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    //use** stops errors
    console.log("successfully connected to MongoDB");
    //logs to console if function connects to mongoose
  } catch (error) {
    console.log(error);
    //if theres an error it will log 
  }
};

connection();