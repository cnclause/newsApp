const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text')
const searchForm = document.querySelector('.search-bar')


searchForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(searchText)
})


