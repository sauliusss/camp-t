const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.connect("mongodb://localhost:27017/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "67c8412fafbd2ab293b6818f",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique eos reiciendis fugit ipsa expedita alias ab quod, pariatur facere, quia ut error distinctio nobis adipisci incidunt itaque sed dicta ratione?",
      price,
      // gal reiks istrint jei neveiks paveiksliukai
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/djx2nzewn/image/upload/v1742547698/camp-t/tbzkbhdxb20gu33lbyby.png",
          filename: "camp-t/tbzkbhdxb20gu33lbyby",
        },
        {
          url: "https://res.cloudinary.com/djx2nzewn/image/upload/v1742547699/camp-t/zn9q6qnhnlpnbq3hk6hd.png",
          filename: "camp-t/zn9q6qnhnlpnbq3hk6hd",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
