const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function validUser(user){
    const hasUsername = typeof user.username == 'string' && user.username.trim() != ''
    const hasPassword = typeof user.password == 'string' && user.password.trim() != ''
    return hasUsername && hasPassword
}




router.get('/', (req, res) => {
    queries.getAll().then(users => {
        res.json(users)
    })
}),

router.post('/', (req, res, next) => {
    if(validUser(req.body)) {
        queries.createUser(req.body).then(users => {
            res.json(users[0])
        })
    } else {
        next(new Error ('invalid Username'))
    }
})


module.exports = router