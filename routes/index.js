const express = require('express');
const router  = express.Router();
const cloudinary   = require('cloudinary');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/board', (req, res, next) => {
  res.render('board');
});
router.post('/board', (req, res, next) => {
  console.log(req.body.imgUrl);
  const imgURI=req.body.imgUrl;
  cloudinary.uploader.upload(imgURI, function(result) {
    console.log(result);
    res.render('index');
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
