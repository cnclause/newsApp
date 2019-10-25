const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const knex = require('../db/knex')
const faker = require('faker')



router.get('/', (req, res) => {
    // return faker.image.animals()
    res.json(faker.image.cats())
})

module.exports = router