const router = require('express').Router();



router.get('/index3', function(req, res) {
    console.log('aaaaaaaaaa');
    res.redirect('/auth.html');
  });


module.exports = router;