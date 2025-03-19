const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/campground");
const { path } = require("express/lib/application.js");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("it work?");
  });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id").get(catchAsync(campgrounds.showCampground)).get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)).delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

module.exports = router;
