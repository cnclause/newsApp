exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', (table) => {
        table.increments('id').primary()
        table.text('author')
        table.text('title')
        table.text('description')
        table.text('url')
        table.text('urlToImage')
        table.text('content')
    }
    )
};
 
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};
