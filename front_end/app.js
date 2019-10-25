
// let currentUserId = ''

const signUpUser = 'http://localhost:3000/signup'
const loginUser ='http://localhost:3000/signin'

const $signInContainer = document.querySelector('.sign-in')  
const $signUpForm = document.querySelector('.signup-form')
const $loginForm = document.querySelector('.login-form') 



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

    $loginTitle.innerText = "Current User Login" 
    $loginInformation.innerText = "Use your username and password to login"      
}

function login() {
    $loginForm.addEventListener('submit', event => {
        // window.location.href = "http://localhost:3001/news.html"
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
