const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsinc = require("../utils/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users.js");

router.get("/register", users.renderRegister);

router.post("/register", catchAsinc(users.register));
router.get("/login", users.renderLogin);

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

router.get("/logout", users.logout);

module.exports = router;
