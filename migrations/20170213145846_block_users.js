
exports.up = function(knex, Promise) {
  return knex.schema.createTable('block_users', (table) => {
    table.increments();
    table.integer('blocker_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('blockee_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('block_users');
};
