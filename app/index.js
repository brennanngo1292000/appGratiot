//define dependences
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const stage = require("../config");
const routers = require("./routes");

//content
const app = express();
const environment = process.env.NODE_ENV;
const connUri = stage[environment].connUri;
const upload = multer();
const router = express.Router();

//connect to mongoose
try{
  mongoose.connect(
    connUri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}catch(err) {
  console.log(err);
}
//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
if (environment !== "production") {
  app.use(logger("dev"));
  // and this
  app.use("/", logger("dev"));
}

//route
app.use("/", routers(router));

module.exports = app;
