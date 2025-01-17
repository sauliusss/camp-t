const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/camp");
const Campground = require("./models/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("start");
});
app.get("/makecamp", async (req, res) => {
  const camp = new Campground({ title: "Make camp great again", description: "cool camp!!" });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("serving on port 3000");
});
