const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/board', (req, res, next) => {
  res.render('board');
});
router.post('/board', (req, res, next) => {
  
})

module.exports = router;
