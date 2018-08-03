const express = require("express");
const passport = require('passport');
const adminRoutes = express.Router();
const User = require("../models/User");

adminRoutes.get("/users", (req, res, next) => {
  User.find({})
    .then(users => {
      console.log(users);
      res.render("admin/users", { users });
    });
});

module.exports = adminRoutes;
