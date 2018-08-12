const express   = require("express");
const passport  = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");

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
  User.find({role : "teacher"})
    .then(users => {
      console.log(users);
      res.render("psych/user-list-profiles", { users });
    });
});

psychRoutes.get('/user-list-profile/:id', (req, res, next) => {
  let userId = req.params.id;
  FeelingSession.find({idUser: userId})
    .then(feelingSessions => {
      console.log(feelingSessions);
      res.render("psych/user-list-profile-detail", { feelingSessions });
    })
    .catch(error => {
      console.log(error)
    });
});

module.exports = psychRoutes;
