const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./names");
const Campground = require("../models/camp");

mongoose.connect("mongodb://localhost:27017/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  array[Math.floor(Math.random() * array.length)];
};

array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const city = new Campground({
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await city.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
