const express   = require("express");
const passport  = require('passport');
const psychRoutes = express.Router();
const User = require("../models/User");
const FeelingSession = require("../models/FeelingSession");
const FaceAnnotation = require("../models/FaceAnnotation");

var resultados;
const checkPsychologist  = checkRoles('psychologist');
const checkUser = checkRoles('user');
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

psychRoutes.get("/user-list-profiles", checkPsychologist,(req, res, next)=>{
  User.find({role : "user"})
    .then(users => {
      console.log(users);
      res.render("psych/user-list-profiles", { users });
    });
});

psychRoutes.get('/user-list-profile/:id', checkPsychologist,(req, res, next) => {
  let userId = req.params.id;
  FaceAnnotation.find({idUser: userId})
    .then(faceAnnotations => {
      res.locals.joyStock=JSON.stringify(getJoyStock(faceAnnotations));
      res.locals.sorrowStock=JSON.stringify(getSorrowStock(faceAnnotations));
      res.locals.angerStock=JSON.stringify(getAngerStock(faceAnnotations));
      res.locals.surpriseStock=JSON.stringify(getSurpriseStock(faceAnnotations));
      res.render("psych/user-list-profile-detail", { faceAnnotations});
    })
    .catch(error => {
      console.log(error)
    });
});

var getJoyStock=function(faceAnnotations){
  var joyStock={};
  var keys=[];
  var joyLevel=[];
  faceAnnotations.forEach(element => {
    var date=new Date(element.created_at);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) {dt = '0' + dt;}
    if (month < 10) {month = '0' + month;}
    var formatedDate=year+'-' + month + '-'+dt+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    keys.push(formatedDate);
  });
  faceAnnotations.forEach(element => {
    var level=0;
    switch(element.joyLikelihood){
      case "UNKNOWN":
      level=0;
      break;
      case "VERY_UNLIKELY":
      level=1;
      break;
      case "UNLIKELY":
      level=2;
      break;
      case "POSSIBLE":
      level=3;
      break;
      case "LIKELY":
      level=4;
      break;
      case "VERY_LIKELY":
      level=5;
      break;
    }
    joyLevel.push(level);
  });
  for(var i=0; i<keys.length;i++){
    joyStock[keys[i]]=joyLevel[i];
  }
  return joyStock;    
}
var getSorrowStock=function(faceAnnotations){
  var sorrowStock={};
  var keys=[];
  var sorrowLevel=[];
  faceAnnotations.forEach(element => {
    var date=new Date(element.created_at);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) {dt = '0' + dt;}
    if (month < 10) {month = '0' + month;}
    var formatedDate=year+'-' + month + '-'+dt+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    keys.push(formatedDate);
  });
  faceAnnotations.forEach(element => {
    var level=0;
    switch(element.sorrowLikelihood){
      case "UNKNOWN":
      level=0;
      break;
      case "VERY_UNLIKELY":
      level=1;
      break;
      case "UNLIKELY":
      level=2;
      break;
      case "POSSIBLE":
      level=3;
      break;
      case "LIKELY":
      level=4;
      break;
      case "VERY_LIKELY":
      level=5;
      break;
    }
    sorrowLevel.push(level);
  });
  for(var i=0; i<keys.length;i++){
    sorrowStock[keys[i]]=sorrowLevel[i];
  }
  return sorrowStock;    
}
var getAngerStock=function(faceAnnotations){
  var angerStock={};
  var keys=[];
  var angerLevel=[];
  faceAnnotations.forEach(element => {
    var date=new Date(element.created_at);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) {dt = '0' + dt;}
    if (month < 10) {month = '0' + month;}
    var formatedDate=year+'-' + month + '-'+dt+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    keys.push(formatedDate);
  });
  faceAnnotations.forEach(element => {
    var level=0;
    switch(element.angerLikelihood){
      case "UNKNOWN":
      level=0;
      break;
      case "VERY_UNLIKELY":
      level=1;
      break;
      case "UNLIKELY":
      level=2;
      break;
      case "POSSIBLE":
      level=3;
      break;
      case "LIKELY":
      level=4;
      break;
      case "VERY_LIKELY":
      level=5;
      break;
    }
    angerLevel.push(level);
  });
    for(var i=0; i<keys.length;i++){
      angerStock[keys[i]]=angerLevel[i];
    }
    return angerStock;    
}
var getSurpriseStock=function(faceAnnotations){
  var surpriseStock={};
  var keys=[];
  var surpriseLevel=[];
  faceAnnotations.forEach(element => {
    var date=new Date(element.created_at);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    if (dt < 10) {dt = '0' + dt;}
    if (month < 10) {month = '0' + month;}
    var formatedDate=year+'-' + month + '-'+dt+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    keys.push(formatedDate);
  });
  faceAnnotations.forEach(element => {
    var level=0;
    switch(element.surpriseLikelihood){
      case "UNKNOWN":
      level=0;
      break;
      case "VERY_UNLIKELY":
      level=1;
      break;
      case "UNLIKELY":
      level=2;
      break;
      case "POSSIBLE":
      level=3;
      break;
      case "LIKELY":
      level=4;
      break;
      case "VERY_LIKELY":
      level=5;
      break;
    }
    surpriseLevel.push(level);
  });
    for(var i=0; i<keys.length;i++){
      surpriseStock[keys[i]]=surpriseLevel[i];
    }
    return surpriseStock;    
}
function checkRoles(role) {
  
  return function(req, res, next) {    
    if (req.isAuthenticated() && req.user.role === role) {
      console.log('usuario autenticado' + req.user.role);
      return next();
    } else {
      console.log('Falta login');
      res.redirect('/auth/login')
    }
  }
}
module.exports = psychRoutes;
