require("dotenv").config();
const { MongoClient } = require("mongodb");
require("./config/dataBase");
const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// global Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
// working

const uri = process.env.dataBase;
const client = new MongoClient(uri);

app.use(cors());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors(corsOpts));
// oriring error

// API Routes
const indexRout = require("./routers/index");
const LockToken = require("./routers/LockToken");
const LockBNB = require("./routers/lockBNB");
const serviceFee = require("./routers/servicesFees");
const AdminLoing = require("./routers/adminLong");
const wallets = require("./routers/wallets");
const liquidity = require("./routers/lockLiquidity");
const LockCIC = require("./routers/lockCIC");

// using router as a global middleware
app.use(indexRout);
app.use("/api", LockToken);
app.use("/api", LockBNB);
app.use("/api", serviceFee);
app.use("/api", AdminLoing);
app.use("/api", wallets);
app.use("/api", liquidity);
app.use("/api", LockCIC);

// if router not found in
app.get("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});

client.connect((err) => {
  if (err) {
    console.error(err);
    return false;
  }
  app.listen(PORT, () => {
    console.log(`server started successfully on PORT Number ${PORT}`);
  });
});
