const express   = require("express");
const passport  = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");

var resultados;

psychRoutes.get("/dashboard", (req, res, next) => {
  User.find({})
    .then(users => {
      res.render("psych/dashboard", { users });
    });
});

psychRoutes.get("/analizar", (req, res, next) => {
  User.find({})
    .then(users => {
      console.log(users);
      res.render("psych/analizar", { resultados });
    });
});

psychRoutes.get("/user-list-profiles", (req, res, next)=>{
  User.find({})
    .then(users => {
      console.log(users);
      res.render("psych/user-list-profiles", { users });
    });
})

module.exports = psychRoutes;
