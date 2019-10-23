
let currentUserId = ''

const signUpUser = 'http://localhost:3000/signup'

const $signInContainer = document.querySelector('.sign-in')  
const $signUpForm = document.querySelector('.signup-form')
const $logInForm = document.querySelector('.login-form')


function createSignIn(){
    const $signUpInstructions = document.querySelector('.instructions')
    const $signUpTitle = document.querySelector('.new-user-title')

    $signUpInstructions.innerText = "Create a username and password to sign up"
    $signUpTitle.innerText = "New User Sign Up"

    $signUpForm.addEventListener('submit', event => {
        event.preventDefault()
        console.log(event)
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
        .then(result => console.log(result))
}


createSignIn()
