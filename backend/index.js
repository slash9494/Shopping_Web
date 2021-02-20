// import * as express from 'express'
const express = require("express");
// import {Request,Response,NextFunction} from 'express'
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const path = require("path");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongDB connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use(express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

app.use("/server/uploads", express.static("server/uploads"));

app.get("/api/hello", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
