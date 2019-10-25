const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const knex = require('../db/knex')
const faker = require('faker')


function validUser(user){
    const hasUsername = typeof user.username == 'string' && user.username.trim() != ''
    const hasPassword = typeof user.password == 'string' && user.password.trim() != ''
    return hasUsername && hasPassword
}

function validUserId(req, res, next){
    if(!isNaN(req.params.id)) return next()
    next( new Error ('Invalid ID'))
} 


router.get('/', (req, res) => {
    queries.getAllUsers().then(users => {
        res.json(users)
    })
})

router.get('/:id', validUserId, (req, res, next) => {  
    knex('user_articles')
        .innerJoin('users', 'users.id', 'user_articles.user_id')
        .innerJoin('articles', 'articles.id', 'user_articles.article_id')
        .where('users.id', req.params.id)
        .then(users => {
            res.json({articles: users})
        })

}) 






// router.post('/', (req, res, next) => {
//     if(validUser(req.body)) {
//         queries.createUser(req.body).then(users => {
//             res.json(users[0])
//         })
//     } else {
//         next(new Error ('invalid Username'))
//     }
// })


module.exports = router