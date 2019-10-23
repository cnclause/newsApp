

const signUpUser = 'http://localhost:3000/signup'
const loginUser ='http://localhost:3000/login'

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
        .then(result => signUpWork(result.user.id))
}

function signUpWork(id){
    currentUserId = id
    login()
    console.log(currentUserId)
}

// function signUpError(){
//     alert("username already taken, try again")
//     createSignIn()
// }

function createLogIn(){
    const $loginTitle = document.querySelector('.currentUserTitle')
    const $loginInformation = document.querySelector('.loginInstructions')

    $loginTitle.innerText = "Current User Signin" 
    $loginInformation.innerText = "Use your username and password to login"      
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
        .then(result => console.log(result))

}



createLogIn()
createSignIn()
