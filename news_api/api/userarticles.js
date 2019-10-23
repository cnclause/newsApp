const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const knex = require('../db/knex')


router.post('/', (req, res, next) => {
    queries.createUserArticle(req.body).then(userarticles => {
        return res.json(userarticles[0])
    })
})

router.get('/', (req, res, next) => {
    queries.getAllUserArticles().then(userarticles => {
        res.json(userarticles)
    })
})



module.exports = router