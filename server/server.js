const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRouters = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials:true
  })
);
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(cookieParser());
dbConnect();
initRouters(app);
// app.use('/',(req,res) => (res.send('SERVER ONnnnn')))

app.listen(port, () => {
  console.log("server running on the port" + port);
});
