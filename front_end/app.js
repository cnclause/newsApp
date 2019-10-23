// current user and add animal id
let currentUserId = 1
let savedAnimalId = ''


const articleUrl = 'http://localhost:3000/api/articles'
const userArticlePost = 'http://localhost:3000/api/userarticles'

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('text-search')
const searchForm = document.querySelector('.search-bar')
const $cardContainer = document.createElement('div')
$cardContainer.className = 'card-container'
let query = ''


searchText.addEventListener('change', event => {
    query = searchText.value
}) 

searchForm.addEventListener('submit', event => {
    event.preventDefault()

    console.log(event)
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=fd5ace6ad0b54f9c9dae1cc5004a9fb5`)
        .then(response => response.json())
        .then(resp => articleArray(resp.articles))
})

function articleArray(articles){
    // $cardContainer.style.display = "none"
    articles.forEach(createArticleCard)
}


function createArticleCard(article) {
    const $card = document.createElement('div')
    const $image = document.createElement('img')
    const $imageBox = document.createElement('div')
    const $infoBox = document.createElement('div')
    const $source = document.createElement('h3')
    const $title = document.createElement('h2')
    const $author = document.createElement('h3')
    const $description = document.createElement('h4')
    // const $content = document.createElement('p')
    const $articleLink = document.createElement('a')
    const $saveArticleButton = document.createElement('button')


    $card.className = "article-card"
    $imageBox.className = "image-box"
    $infoBox.className = "info-box"
    $title.className = "article-title"
    $saveArticleButton.className = "save-article"

    $image.src = article.urlToImage
    $source.innerText = `Source:  ${article.source.name}`
    $title.innerText = article.title
    $author.innerText = `Author:  ${article.author}`
    $description.innerText = `Description:  
    ${article.description}`
    // $content.innerText = article.content 
    $articleLink.innerText = "click here for full article"
    $articleLink.href = article.url
    $saveArticleButton.innerText = "Save To Read Later"

    $saveArticleButton.addEventListener('click', event => {
                addArticleToUser(article)
        })
            
    $imageBox.append($title, $image)
    $infoBox.append($source, $author, $description)
    $card.append($imageBox, $infoBox, $articleLink, $saveArticleButton)
    $cardContainer.append($card)
    document.body.append($cardContainer)
}

function addArticleToUser(article){
    fetch(articleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            content: article.content
        })
    }).then(response => response.json())
    .then(result => saveAnimalId(result.id))
} 

function saveAnimalId(id){
    savedAnimalId = id
    
}


