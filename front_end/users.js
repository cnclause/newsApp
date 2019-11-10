const getUserArticles = 'https://api-newsapp.herokuapp.com/api/users/'
const deleteArticleUrl = 'https://api-newsapp.herokuapp.com/api/articles'
const currentUserId = localStorage.getItem('currentUserId')
const memesUrl = "https://api-newsapp.herokuapp.com/api/memes"


const $savedArticlesButton = document.querySelector('.saved-articles')
const $userSection = document.createElement('div')
$userSection.className = "user-section"
const $memeSection = document.createElement('div')
$memeSection.className = "meme-section"

const $userCardContainer = document.createElement('div')
$userCardContainer.className = 'user-card-container'

function showUserArticles(){
    console.log(getUserArticles + currentUserId)
    fetch(getUserArticles + currentUserId)
        .then(response => response.json())
        .then(result => userArticleArray(result.articles))
}

function userArticleArray(articles){
    articles.forEach(createUserCard)
}

function createUserCard(articles){
    const $card = document.createElement('div')
    const $image = document.createElement('img')
    const $imageBox = document.createElement('div')
    const $infoBox = document.createElement('div')
    const $title = document.createElement('h2')
    const $author = document.createElement('h3')
    const $description = document.createElement('h4')
    const $content = document.createElement('p')
    const $articleLink = document.createElement('a')
    const $deleteButton = document.createElement('button')

    $card.className = "article-card"
    $imageBox.className = "image-box"
    $infoBox.className = "info-box"
    $title.className = "article-title"
    $deleteButton.className = "delete-button"

    $image.src = articles.urlToImage
    $title.innerText = articles.title
    $author.innerText = `Author:  
    ${articles.author}`
    $description.innerText = `Description:  
    ${articles.description}`
    $articleLink.href = articles.url
    $articleLink.innerText = "click here for full article"
    $deleteButton.innerText = "remove article"

    $deleteButton.addEventListener('click', event => {
        // console.log(event)
        event.target.
        deleteArticle(articles)
    })

    $imageBox.append($title, $image)
    $infoBox.append($author, $description)
    $card.append($imageBox, $infoBox, $articleLink, $deleteButton)
    $userCardContainer.append($card)
    $userSection.append($userCardContainer, $memeSection)
    document.body.append($userSection)
}


function deleteArticle(article){
    fetch(deleteArticleUrl + article.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                user_id: currentUserId,
                article_id: article.id
            }
        )
    }).then(response => response.json())
    .then(result => console.log(result))
    // .then(card.remove())

}


function seeMemes(){
    $memeButton = document.createElement('button')
    $memeButton.className = "meme-button"
    $memeButton.innerText = "News got ya down? Click me for a smile"
    $memeSection.append($memeButton)

    $memeButton.addEventListener('click', event => {
        // console.log(event)
        fetchMemes()
    })
}

function fetchMemes(){
    fetch(memesUrl)
        .then(response => response.json())
        .then(result => createMeme(result))
}

function createMeme(memeLink){
    $memeImage = document.createElement('img')
    $memeImage.classname = "meme-image"
    $memeImage.src = memeLink
    // console.log($memeImage)

    $memeSection.append($memeImage)
    document.body.append($memeSection)
}

logout()
seeMemes()

if(window.location.href === "https://news-app-5a3fc.firebaseapp.com/users.html"){
    showUserArticles()
}
