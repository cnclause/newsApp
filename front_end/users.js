const getUserArticles = 'http://localhost:3000/api/users/'
const deleteArticleUrl = 'http://localhost:3000/api/articles/'
const currentUserId = localStorage.getItem('currentUserId')

const $savedArticlesButton = document.querySelector('.saved-articles')

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
        deleteArticle(articles)
    })

    $imageBox.append($title, $image)
    $infoBox.append($author, $description)
    $card.append($imageBox, $infoBox, $articleLink, $deleteButton)
    $userCardContainer.append($card)
    document.body.append($userCardContainer)
}


function deleteArticle(article){
    const card = document.querySelector('.article-card')
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
    .then(card.remove())

}

if(window.location.href === "http://localhost:3001/users.html"){
    showUserArticles()
}
