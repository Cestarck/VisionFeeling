const express   = require("express");
const passport  = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");
const FaceAnnotation = require("../models/FaceAnnotation");

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
  FaceAnnotation.find({idUser: userId})
    .then(faceAnnotations => {
      console.log(faceAnnotations);
      res.render("psych/user-list-profile-detail", { faceAnnotations });
    })
    .catch(error => {
      console.log(error)
    });
});

module.exports = psychRoutes;
