const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const USER_MODEL = require("./API/Models/user.model");
const Routes = require("./API/Routes/Routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/' , Routes)

const mongooseURL =
  "mongodb+srv://malekkbh:123456780@cluster0.vihc5td.mongodb.net/";

mongoose.connect(mongooseURL);

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

app.get("/app", (req, res) => {
  res.status(200).json({
    name: "Aihab",
    city: "Bartaa",
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


app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await USER_MODEL.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
  }
});

// router.method('/route' , controller)

module.exports = app;
