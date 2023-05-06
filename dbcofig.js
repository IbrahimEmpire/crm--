// const DB = CRM

const mongoose = require("mongoose");

const connect = async()=>{
 await mongoose.connect(
    "mongodb+srv://ibrahim:n9WhvbpBw6Gtny3I@cluster0.vyrjjl0.mongodb.net/CRM?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log("mongo is connected")
  );

}

module.exports = connect

