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

router.get('/board', (req, res, next) => {
  res.render('board');
});
router.post('/board', (req, res, next) => {
  //console.log(req.body.imgUrl);
  const imgURI=req.body.imgUrl;
  cloudinary.uploader.upload(imgURI, function(result) { 
  console.log(result); 
  client
  .faceDetection(result.secure_url)
  .then(results => {
    const faces = results[0].faceAnnotations;

    console.log('Faces:');
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joyLikelihood}`);
      console.log(`    Anger: ${face.angerLikelihood}`);
      console.log(`    Sorrow: ${face.sorrowLikelihood}`);
      console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});
})
router.post('/board/:imgAsDataURL', (req, res, next) => {
  const imgURI=req.params.imgAsDataURL;
  console.log(req.params.imgAsDataURL);
  cloudinary.uploader.upload(imgURI, function(result) { 
  console.log("Resut"+result+"Result"); 
});
})

module.exports = router;
