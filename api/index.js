const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const moongose = require("mongoose");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();

app.use(express.json()); //to use req object that is in json format
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

moongose.connect(process.env.MONGO_URL);

app.use("", require("./Routes/users"));
app.use("",require('./Routes/QuestionRoute'));
app.use("",require('./Routes/AssessmentRoutes'));
app.use("",require('./Routes/candidateRoutes'));
app.use("",require('./Routes/TestRoutes'));


const server = app.listen(4000);
module.exports = app;
