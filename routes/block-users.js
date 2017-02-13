const express = require('express');
const router = express.Router();
const query = require('../db/query');


router.post('/', function (req, res) {
  console.log(req.body);
  query('block_users')
    .add(req.body)
    .then(userBlocks => {
      res.json(userBlocks);
    })
    .catch(console.error);
});

module.exports = router;
