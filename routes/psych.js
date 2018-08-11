const express   = require("express");
const vision    = require('@google-cloud/vision');
const passport  = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");

// Creates a client for Vision API
// const client = new vision.ImageAnnotatorClient();
// Performs label detection on the image file
let fileName = './public/images/cumpleEmma2.jpeg';
var resultados;

psychRoutes.get("/dashboard", (req, res, next) => {
  User.find({})
    .then(users => {
      // console.log(users);
      res.render("psych/dashboard", { users });
    });
});

psychRoutes.get("/analizar", (req, res, next) => {
  // client
  //   .faceDetection(fileName)
  //   .then(results => {
  //     const faces = results[0].faceAnnotations;
  //     resultados = faces;
  //
  //     console.log('Faces:');
  //     faces.forEach((face, i) => {
  //       console.log(`  Face #${i + 1}:`);
  //       console.log(`    Joy: ${face.joyLikelihood}`);
  //       console.log(`    Anger: ${face.angerLikelihood}`);
  //       console.log(`    Sorrow: ${face.sorrowLikelihood}`);
  //       console.log(`    Surprise: ${face.surpriseLikelihood}`);
  //     });
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });
  User.find({})
    .then(users => {
      console.log(users);
      res.render("psych/analizar", { resultados });
    });
});

module.exports = psychRoutes;
