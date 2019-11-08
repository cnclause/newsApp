const getUserArticles = 'https://api-newsapp.herokuapp.com/api/users'
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

// $savedArticlesButton.addEventListener('click', event => {
//     // event.preventDefault()
//     setTimeout(showUserArticles, 2000)
//     console.log(event)
//     // $cardContainer.style.display = "none"
//     showUserArticles()
    
// })


function showUserArticles(){
    console.log(getUserArticles + currentUserId)
    fetch(getUserArticles + currentUserId)
        .then(response => response.json())
        // .then(setTimeout(userArticleArray(result.articles), 1000))
        .then(result => userArticleArray(result.articles))
        // .then(console.log(userArticles))

}

function userArticleArray(articles){
    articles.forEach(createUserCard)
}

function createUserCard(articles){
    const $card = document.createElement('div')
    const $image = document.createElement('img')
    const $imageBox = document.createElement('div')
    const $infoBox = document.createElement('div')
    // const $source = document.createElement('h3')
    const $title = document.createElement('h2')
    const $author = document.createElement('h3')
    const $description = document.createElement('h4')
    const $content = document.createElement('p')
    const $articleLink = document.createElement('a')
    const $deleteButton = document.createElement('button')
    // const $linkContainer = document.getElementsByClassName('')

    $card.className = "article-card"
    $imageBox.className = "image-box"
    $infoBox.className = "info-box"
    $title.className = "article-title"
    $deleteButton.className = "delete-button"

    $image.src = articles.urlToImage
    // $source.innerText = `Source:  
    // ${articles.source.name}`
    $title.innerText = articles.title
    $author.innerText = `Author:  
    ${articles.author}`
    $description.innerText = `Description:  
    ${articles.description}`
    $articleLink.href = articles.url
    $articleLink.innerText = "click here for full article"
    $deleteButton.innerText = "remove article"

    $deleteButton.addEventListener('click', event => {
        console.log(event)
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
    // const card = document.querySelector('.article-card')
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
        console.log(event)
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
    console.log($memeImage)

    $memeSection.append($memeImage)
    document.body.append($memeSection)
}

logout()
seeMemes()

if(window.location.href === "http://localhost:3001/users.html"){
    showUserArticles()
}
