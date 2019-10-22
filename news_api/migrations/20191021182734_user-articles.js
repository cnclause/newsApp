exports.up = function(knex, Promise) {
    return knex.schema.createTable('user-articles', (table) => {
        table.increments('id').primary()
        table.integer('user_id').references('users.id')
        table.integer('article_id').references('articles.id')
    })
  };
   
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('user-articles')
  };
