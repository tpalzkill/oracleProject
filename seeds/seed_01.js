
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {text: "Finish Oracle presentation.", completed: false},
        {text: "Get a dog.", completed: false},
        {text: "Walk the dog.", completed: false},
      ]);
    });
};
