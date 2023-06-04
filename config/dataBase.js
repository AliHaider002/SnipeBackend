// require('dotenv').config()
const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/buenotechapp',{
// console.log(process.env.dataBase)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.dataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });
