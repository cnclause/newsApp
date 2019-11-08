// Update with your config settings.

module.exports = {
  clinet: 'pg',
  
  development: {
    client: 'pg',
    connection: 'postgres://localhost/users-articles-db'
  }, 
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
