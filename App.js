const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
// const Routs = require("./api/routes/Router");
const app = express();
app.use(express.json());
app.use(cors());

const mongooseURL =
  "mongodb+srv://malekkbh:123456780@cluster0.vihc5td.mongodb.net/";

mongoose.connect(mongooseURL);

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

app.get("/app", (req, res) => {
  res.status(200).json({
    name: "Geahad",
    city: "Nazareth",
  });
});

app.post("/whatMyName", (req, res) => {
  const { name, lastName } = req.body;
  // const name= req.body.name

  if (!name || !lastName) {
    res.status(703).json({
      error: true,
      errorMessage: "name and last name are MUST!",
    });
    return;
  }

  res.status(200).json({
    fullName: name + " " + lastName,
  });
});

module.exports = app;
