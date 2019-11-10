// current user and add article id

let savedArticleId = ''


const articleUrl = 'https://api-newsapp.herokuapp.com/api/articles'
const userArticlePost = 'https://api-newsapp.herokuapp.com/api/userarticles'


const searchButton = document.getElementById('search-button')
let searchText = document.querySelector('#text-search')
const searchForm = document.querySelector('.search-bar')
const $cardContainer = document.createElement('div')
$cardContainer.className = 'card-container'
let query = ''
searchText.value = ''



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
    $cardContainer.innerHTML = " "
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
    const $saveArticleButton = document.createElement('a')
    const $linkContainer = document.createElement('div')
    $linkContainer.className = "link-container"
    // const $savedArticlesButton = document.querySelector('.saved-articles')


    $card.className = "article-card"
    $imageBox.className = "image-box"
    $infoBox.className = "info-box"
    $title.className = "article-title"
    $saveArticleButton.className = "save-article"

    $image.src = article.urlToImage
    $source.innerText = `Source:  
    ${article.source.name}`
    $title.innerText = article.title
    $author.innerText = `Author:  
    ${article.author}`
    $description.innerText = `Description:  
    ${article.description}`
    // $content.innerText = article.content 
    $articleLink.innerText = "click here for full article"
    $articleLink.href = article.url
    $saveArticleButton.innerText = "click to save article"
    // $saveArticleButton.href = "users.html"


    $saveArticleButton.addEventListener('click', event => {
                addArticleToUser(article)
               
        })
       
    $imageBox.append($title, $image)
    $infoBox.append($source, $author, $description)
    $linkContainer.append($articleLink, $saveArticleButton)
    $card.append($imageBox, $infoBox, $linkContainer)
    $cardContainer.append($card)
    document.body.append($cardContainer)
}

function addArticleToUser(article){
    alert("article saved")
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
    .then(result => saveArticleId(result.id))
} 

function saveArticleId(id){
    localStorage.setItem('savedArticleId', id)
    console.log(localStorage.getItem('savedArticleId'))
    console.log(localStorage.getItem('currentUserId'))

    addUserArticles()
}

function addUserArticles(){
    fetch(userArticlePost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('currentUserId'),
            article_id: localStorage.getItem('savedArticleId')
        })

    }).then(response => response.json())
        .then(result => console.log(result))
}

function logout(){
    const logoutButton = document.querySelector('.Logout')
    logoutButton.addEventListener('click', event => {
        localStorage.removeItem('currentUserId')
        localStorage.removeItem('savedArticleId')
    })
    
}

logout()




// $savedArticlesButton.addEventListener('click', event => {
//     showUserArticles()
// })