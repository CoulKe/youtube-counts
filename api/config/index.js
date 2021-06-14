const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@${process.env.cluster_name}.gyo32.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`

mongoose.connect(
  uri,
  {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false
  },
  (error) => {
    if (!error) {
      return console.log("successfully connected");
    } else {
      return console.log("Error connecting to the database: ", error);
    }
  }
);