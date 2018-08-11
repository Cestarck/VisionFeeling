const express = require('express');
const router  = express.Router();
const cloudinary   = require('cloudinary');
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
