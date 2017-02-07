const express = require('express');
const router = express.Router();
const query = require('../db/query');
const formatResponse = require('../utilities/format-response');
const {saveMessage} = require('../repositories/message.repo.js');

router.get('/', function (req, res) {
  console.log('endpoint reached');
  query('messages')
    .all()
    .then(formatResponse)
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  console.log(req.body);
  saveMessage(req.body)
    .then(console.log);
});


router.get('/:id', function (req, res) {
  console.log('hitting messages id route');
  query('messages')
    .one(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
});



module.exports = router;
