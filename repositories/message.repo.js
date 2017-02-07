const R = require('ramda');
const query = require('../db/query');
const {findOrCreateUser} = require('./users.repo.js');
const {findOrCreateRoom} = require('./rooms.repo.js');

module.exports = (function() {
  const saveMessage = (data) => {
    return findOrCreateUser(data.name)
      .then(user => {
        findOrCreateRoom(data.url)
          .then(room => {
            let info = {
              user_id: user.id,
              room_id: room.id,
              content: data.message
            };
            query('messages')
              .add(info)
              .then(message => {
                console.log('Message added to database');
              })
          });
      });
  }

  return {saveMessage}
}());
