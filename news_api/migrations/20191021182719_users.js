exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.text('username')
        table.unique('username')
        table.text('password')
        table.text('password_digest')
        table.text('token')
    }
    )
};
 
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
  };