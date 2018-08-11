const express      = require("express");
const passport     = require('passport');
const cloudinary   = require('cloudinary');
const authRoutes   = express.Router();
const User         = require("../models/User");
<<<<<<< HEAD
const FeelingSession = require("../models/FeelingSession");
const Picture = require("../models/Picture");
=======

>>>>>>> cd28ab109ec7008325083a9207277a9ff10dad6c
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post('/login',passport.authenticate('local',{
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
  }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    const imgURI = req.body.imgUrl;
<<<<<<< HEAD
    const username = req.body.username;
    
    User.findOne({ username }, "username", (err, user) => {
      const idUser =user._id;
      //console.log(idUser);
      const newFeelingSession = new FeelingSession({
        idUser: idUser

      });
  
      newFeelingSession.save((err,object) => {
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
                  newPicture.save((err)=>{
                    if(err){
                      console.log(err);
                    }else{
                      res.redirect("/");
                    }
                  })
              
            
            
          }); 
        }
      });
    }); 
=======
    cloudinary.uploader.upload(imgURI, function(result) {
      console.log(result);
      res.render('index');
    });
>>>>>>> cd28ab109ec7008325083a9207277a9ff10dad6c
});

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  console.log(username,password,email);

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
      role:"teacher"
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
