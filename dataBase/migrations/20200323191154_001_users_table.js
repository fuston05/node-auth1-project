
exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl.string('username')
      .index()
      .unique();

    tbl.string('password');

  })//end users table
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users');
};
