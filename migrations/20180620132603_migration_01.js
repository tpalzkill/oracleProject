
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('todo_id').primary();
    table.string('text');
    table.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos');
};
