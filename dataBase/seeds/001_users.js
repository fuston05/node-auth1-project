
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userame: 'user_1', password: ''},
        {userame: 'user_2', password: ''},
        {userame: 'user_3', password: ''}
      ]);
    });
};
