const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const request = require('request')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('fd5ace6ad0b54f9c9dae1cc5004a9fb5');


router.get('/', (req, res) => {
    queries.getAllArticles().then(articles => {
        res.json(articles)
    })
})

router.post('/', (req, res, next) => {
    queries.createArticle(req.body).then(articles => {
       return res.json(articles[0])
    })
})

module.exports = router

// request('https://newsapi.org/v2/top-headlines?language=en&apiKey=fd5ace6ad0b54f9c9dae1cc5004a9fb5', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
// //   console.log('statusCode:', response && response.statusCode); 
//   // Print the response status code if a response was received
//   console.log('body:', body) 
// //   console.log(body)
// }) 

// newsapi.v2.topHeadlines({
//     language: 'en'
// }).then(responses => { 
//     responses.articles.forEach(response => {
//       console.log(response.title)
//     })
// })

// newsapi.v2.sources({
//     language: 'en'
// }).then(responses => {
//     responses.sources.forEach(response => {
//         console.log(response.name)
//     })
// }) 

// newsapi.v2.everything({
//     q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   language: 'en',
//   sortBy: 'relevancy'
// }).then(response => {
//     console.log(response)
// })
