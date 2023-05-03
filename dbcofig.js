// const DB = CRM

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://ibrahim:3xTxzXTIy1Bk4E7h@cluster0.vyrjjl0.mongodb.net/CRM?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongo is connected")
);
