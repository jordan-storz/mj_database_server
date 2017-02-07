const R = require('ramda');
const query = require('../db/query');

module.exports = (function() {
  const findOrCreateRoom = (name) => {
    return query('rooms')
      .by('name', name)
      .then(R.head)
      .then(room => {
        if (!room) {
          query('rooms')
            .add({name})
            .then(R.identity)
        } else {
          return Promise.resolve(room);
        }
      });
  }

  return {findOrCreateRoom};
}());
