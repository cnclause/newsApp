const knex = require('./knex')

module.exports = {
    getAll(){
        return knex('users') 
    },

    createUser(user){
    return knex('users')
            .insert(user, '*')
            .catch( resp => {
                return [{error: "username already taken"}]
            })
            //     function( resp ){
            //     console.log("error:", resp );
            // })
            // .catch(function(err) {
            //    console.log(err.stack);
            // })
            
    },

    uniqueUser(user){
        console.log(user.username)
        knex('users')
            .where({
                username: user.username
            })
            .select('username') 
            .catch(console.error)
        

        // if('id'!= null){
        //     return knex('users').insert(user, '*')
        // } else {
        //     return "username is already taken"
        // }
    }
}