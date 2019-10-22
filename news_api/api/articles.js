const express = require('express')
const router = express.Router()
const queries = require('../db/queries')
const request = require('request')

request('https://newsapi.org/v2/sources?apiKey=fd5ace6ad0b54f9c9dae1cc5004a9fb5', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body)
})