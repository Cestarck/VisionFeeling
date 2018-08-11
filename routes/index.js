const express = require('express');
const router  = express.Router();
const cloudinary   = require('cloudinary');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
let fileName = 'https://res.cloudinary.com/feelingmonitor/image/upload/v1533857611/vsdbrodfd37ptm2pcctr.png';
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
