const express = require("express");
const passport = require("passport");
const cloudinary = require("cloudinary");
const vision = require("@google-cloud/vision");


const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");
const Picture = require("../models/Picture");
const FaceAnnotation = require("../models/FaceAnnotation");
const Psychologist = require("../models/Psychologist");
const Student = require("../models/Student");

const authRoutes = express.Router();
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Creates a client for Vision API
const client = new vision.ImageAnnotatorClient();

const checkPsychologist   = checkRoles('psychologist');
const checkUser           = checkRoles('user');

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post("/login",
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

    User.findOne({
      username
    }, "username", (err, user) => {
      const idUser = user._id;
      const newFeelingSession = new FeelingSession({
        idUser: idUser
      });

      newFeelingSession.save((err, object) => {
        if (err) {
          res.render("auth/", {
            message: "Something went wrong"
          });
        } else {
          console.log(object);
          cloudinary.uploader.upload(imgURI, function(result) {
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
                evaluatePicture(result.url, object._id, idUser, res);
                //res.redirect("/");
                if (req.isAuthenticated() && req.user.role === 'psychologist') {

                  res.redirect("/psych/user-list-profiles");

                } else if (req.isAuthenticated() && req.user.role === 'user') {
                  res.redirect("/user/board");
                } else {
                  res.redirect('/auth/login');
                }
              }
            });
          });
        }
      });
    });
  }
);

let evaluatePicture = function(url, idSession, inIdUser, res) {
  client
    .faceDetection(url)
    .then(results => {
      const faces = results[0].faceAnnotations;
      resultados = faces;

      console.log("Faces:");
      faces.forEach((face, i) => {
        const newFaceAnnotation = new FaceAnnotation({
          idUser: inIdUser,
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
  const status = true;

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
      role: role,
      status: true,
      email: email
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
        }else if(role.includes('user')){
          
            const idOrganization= null;
            const registerNumber= 123456;
            const underTreatment= false;
            const idPsychologist= null;
            const enrolledToCourse= false;
            const idTutor= null;
            const problematicTopics= "any";          
            const newStudent = new Student({
            idUser: user._id,
            idOrganization: idOrganization,
            registerNumber: registerNumber,
            underTreatment: underTreatment,
            idPsychologist: idPsychologist,
            enrolledToCourse: enrolledToCourse,
            idTutor: idTutor,
            problematicTopics: problematicTopics
          });
          newStudent.save(err => {
            if (err) {
              console.log(err);
            } else {
              
              res.redirect("/");
            }
          });
        }else{
          res.redirect("/");
        }
      }
    });
  });
});


authRoutes.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/auth/login");
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

function firstViewRoles() {
  console.log("firs view");
  return function(req, res, next) {
    console.log(req.user.role)
    if (req.isAuthenticated() && req.user.role === 'psychologist') {

        res.redirect("/psych/user-list-profiles");

    }else if(req.isAuthenticated() && req.user.role === 'user'){
      res.redirect("/user/board");
    }else{
      res.redirect('/auth/login');
    }
}}

module.exports = authRoutes;
