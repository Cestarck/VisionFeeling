const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary");
const authRoutes = express.Router();
const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");
const Picture = require("../models/Picture");
const vision = require("@google-cloud/vision");
const FaceAnnotation = require("../models/FaceAnnotation");
const Psychologist = require("../models/Psychologist");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// Creates a client for Vision API
const client = new vision.ImageAnnotatorClient();
// Performs label detection on the image file

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    const imgURI = req.body.imgUrl;
    const username = req.body.username;

    User.findOne({ username }, "username", (err, user) => {
      const idUser = user._id;
      //console.log(idUser);
      const newFeelingSession = new FeelingSession({
        idUser: idUser
      });

      newFeelingSession.save((err, object) => {
        if (err) {
          res.render("auth/", { message: "Something went wrong" });
        } else {
          console.log(object);
          cloudinary.uploader.upload(imgURI, function(result) {
            //console.log(result);
            //res.render('index');
            const newPicture = new Picture({
              idFeelingSession: object._id,
              public_id: result.public_id,
              version: result.version,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
              url: result.url,
              secure_url: result.secure_url
            });
            newPicture.save(err => {
              if (err) {
                console.log(err);
              } else {
                evaluatePicture(result.url,object._id,res);
                //res.redirect("/");
              }
            });
          });
        }
      });
    });
  }
);

let evaluatePicture = function(url, idSession, res) {
  client
    .faceDetection(url)
    .then(results => {
      const faces = results[0].faceAnnotations;
      resultados = faces;

      console.log("Faces:");
      faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
        const newFaceAnnotation=new FaceAnnotation({
          idFeelingSession: idSession,
          joyLikelihood: face.joyLikelihood,
          sorrowLikelihood: face.sorrowLikelihood,
          angerLikelihood: face.angerLikelihood,
          surpriseLikelihood: face.surpriseLikelihood,
          underExposedLikelihood: face.underExposedLikelihood,
          blurredLikelihood: face.blurredLikelihood,
          headwearLikelihood: face.headwearLikelihood
        });
        newFaceAnnotation.save(err => {
          if (err) {
            console.log(err);
          } else {
            
            res.redirect("/");
          }
        });
      });
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
};

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;

  console.log(username, password, email);

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      role: role
    });

    newUser.save((err,user) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        if(role.includes('psychologist')){
          const medicalLicenseNumber=req.body.medicalLicenseNumber;
          const university1=req.body.university1;
          const university2=req.body.university2;
          const experience=req.body.experience;
          const newPsychologist = new Psychologist({
            idUser: user._id,
            medicalLicenseNumber: medicalLicenseNumber,
            university1: university1,
            university2: university1,
            experience: experience
          });
          newPsychologist.save(err => {
            if (err) {
              console.log(err);
            } else {
              
              res.redirect("/");
            }
          });
        }else{
    
        }
      }
    });
  });
});

authRoutes.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
