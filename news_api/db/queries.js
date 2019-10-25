const knex = require('./knex')

module.exports = {
    getAllUsers(){
        return knex('users') 
    },

    getOneUser(id){
        return knex('users').where('id', id).first()
    },

    // createUser(user){
    // return knex('users')
    //         .insert(user, '*')
    //         .catch( resp => {
    //             return [{error: "username already taken"}]
    //         })
            
    // },

    isUniqueUser(username){
      return knex('users').where({username})
        .then(users => !!users.length )
     },


    getAllArticles(){
        return knex('articles')
    },

    createArticle(article){
        return knex('articles').insert(article, '*')
    },

    createUserArticle(userarticle){
        return knex('user_articles').insert(userarticle, '*')
    }, 

    getAllUserArticles(){
        return knex('user_articles')
    },

    deleteArticle(id) {
        return knex('user_articles').where('article_id', id).del()
    }

}