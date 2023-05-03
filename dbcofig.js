// const DB = CRM

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://ibrahim:Wy1N3c8guBGJee0v@cluster0.vyrjjl0.mongodb.net/CRM?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("mongo is connected")
);
