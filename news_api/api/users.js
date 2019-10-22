const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

module.exports =[ 
    router.get('/', (req, res) => {
        queries.getAll().then(users => {
            res.json(users)
        })
    })
]
