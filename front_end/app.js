
// let currentUserId = ''

const signUpUser = 'https://api-newsapp.herokuapp.com/signup'
const loginUser ='https://api-newsapp.herokuapp.com/signin'

const $signInContainer = document.querySelector('.sign-in')  
const $signUpForm = document.querySelector('.signup-form')
const $loginForm = document.querySelector('.login-form') 
$signUpForm.style.display = "none"



function createSignIn(){
    const $signUpInstructions = document.querySelector('.instructions')
    const $signUpTitle = document.querySelector('.new-user-title')

    $signUpInstructions.innerText = "Create a username and password to sign up"
    $signUpTitle.innerText = "New User Sign Up"

    $signUpForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData($signUpForm)
        const username = formData.get('username')
        const password = formData.get('password')

        user = {
            username,
            password
        }
        
        createUser(user)
    })
}

function createUser(user){
     console.log("made it")
    fetch(signUpUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
        .then(result => result.error ? signUpError(result.error) : signUpWork())
        //     signUpWork(result.user.id))
        // .catch(console.error)
}

function signUpWork(){
    alert("Your signup was successful, please log in")
    $signUpForm.style.display = "none"

}

function signUpError(error){
    alert(error)
}

// function signUpError(){
//     alert("username already taken, try again")
//     createSignIn()
// }

function createLogIn(){
    const $loginTitle = document.querySelector('.currentUserTitle')
    const $loginInformation = document.querySelector('.loginInstructions')
    const $newUserButton = document.createElement('button')
    const $p = document.createElement('p')
    const $signUpButtonContainer = document.createElement('div')

    $signUpButtonContainer.className = "signup-button-container"
    $p.className = "p-tag-sign-up"

    $p.innerText = "New User?"
    $loginTitle.innerText = "Current User Login" 
    $loginInformation.innerText = "Use your username and password to login" 

    $signUpButtonContainer.append($newUserButton, $p)
    $loginForm.append($signUpButtonContainer)

    $newUserButton.innerText = "Sign Up"
    $newUserButton.addEventListener('click', event => {
        $signUpForm.style.display = "flex"
        event.target.parentNode.style.display = "none"
    })      
}


function login() {
    $loginForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData($loginForm)
        const username = formData.get('username')
        const password = formData.get('password')

        user = {
            username,
            password
        }

        checkLogin(user)
    })
}


function checkLogin(user){
    fetch(loginUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
        .then(result => result.error ? errorLogIn(result.error) : successfulLogin(result.id))


}

function errorLogIn(error){
    alert(error)
}

function successfulLogin(id){
  localStorage.setItem('currentUserId', id)
    console.log('currentUserId')
    newsPage()
}

function newsPage(){
    window.location.href = "http://localhost:3001/news.html"
}



login()
createLogIn()
createSignIn()
