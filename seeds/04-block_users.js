
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('block_users').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE block_users_id_seq RESTART WITH 4')
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('block_users').insert({
          id: 1,
          blocker_id: 1,
          blockee_id: 2
        }),
        knex('block_users').insert({
          id: 2,
          blocker_id: 3,
          blockee_id: 4
        }),
        knex('block_users').insert({
          id: 3,
          blocker_id: 3,
          blockee_id: 1
        })
      ]);
    });
};
