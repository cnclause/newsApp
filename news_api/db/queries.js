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

    uniqueUser(user){
        console.log(user.username)
        knex('users')
            .where({
                username: user.username
            })
            .select('username') 
            .catch(console.error)
        
    }, 

    getAllArticles(){
        return knex('articles')
    },

    createArticle(article){
        return knex('articles').insert(article, '*')
    }

}