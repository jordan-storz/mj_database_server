const R = require('ramda');
const query = require('../db/query');

module.exports = (function() {
  const findOrCreateUser = (username) => {
    return query('users')
      .by('username', username)
      .then(R.head)
      .then(user => {
        if (!user) {
          query('users')
            .add({username})
            .then(R.identity)
        } else {
          return Promise.resolve(user);
        }
      });
  }

  return {findOrCreateUser};
}());
