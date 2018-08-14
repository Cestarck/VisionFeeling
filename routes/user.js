const express = require("express");
const passport = require('passport');
const userRoutes = express.Router();
const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");
const FaceAnnotation = require("../models/FaceAnnotation");

const checkPsychologist = checkRoles('psychologist');
const checkUser = checkRoles('user');

userRoutes.get('/board', checkUser, (req, res, next) => {
  res.render('user/board');
});

function checkRoles(role) {
  return function(req, res, next) {
    console.log(req.user.role)
    if (req.isAuthenticated() && req.user.role === role) {

      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

module.exports = userRoutes;
