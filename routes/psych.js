const express = require("express");
const passport = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");

psychRoutes.get("/dashboard", (req, res, next) => {
  User.find({})
    .then(users => {
      console.log(users);
      res.render("psych/dashboard", { users });
    });
});

module.exports = psychRoutes;
