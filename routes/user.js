const express = require('express');
const router = express.Router();
const query = require('../db/query');


router.get('/', function (req, res) {
  query('users')
    .all()
    .then(users => {
      res.json(users);
    })
    .catch(console.error);
});

router.post('/', function (req, res) {
  query('users')
    .add({username: 'testName'})
    .then(user => {
      return res.json(user);
    })
    .catch(console.error);
});

router.get('/:id', function (req, res) {
  query('users')
    .one(req.params.id)
    .then(user => {
      query('block_users')
      .by('blocker_id', req.params.id)
      .then(blockerBlocks => {
        query('block_users')
        .by('blockee_id', req.params.id)
        .then(blockeeBlocks => {
          let blocks = blockerBlocks.concat(blockeeBlocks)
          let blockUsers = blocks.map(block => {
            if(block.blocker_id !== user.id) {
              return block.blocker_id;
            } else {
              return block.blockee_id;
            }
          });
          let response = {
            user,
            blockUsers
          };
          res.json(response);
        })
      })
    })
    .catch(console.error);
});

module.exports = router;
