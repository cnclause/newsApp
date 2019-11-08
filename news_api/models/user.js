const environment = process.env.NODE_ENV || 'development'; // set environment
const configuration = require('../knexfile')[environment];// pull in correct db with env configs
const database = require('knex')(configuration);// define database based on above
const bcrypt = require('bcrypt')  // bcrypt will encrypt passwords to be saved in db
const crypto = require('crypto') // built-in encryption node module
const queries = require('../db/queries')

// sign up methods!

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
        err ? reject(err) : resolve(hash)
    }))
}

const createUser = (user) => {
    return database.raw(
        "INSERT INTO users (username, password_digest, token) VALUES (?, ?, ?) RETURNING id, username, token",
        [user.username, user.password_digest, user.token]
    )
    .then((data) => data.rows[0])
    .catch(console.error)
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}


const signup = (req, res) => {
    const user = req.body
    // console.log(user.username)
    queries.isUniqueUser(user.username)
        .then(isUnique => {
            console.log("FfFFFF", isUnique)
            if(isUnique) throw new Error ("Username is already taken")

            return hashPassword(user.password)
        }).then((hashedPassword) => {
            delete user.password 
            user.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(() => createUser(user))
        .then(user => {
            delete user.password_digest
            res.status(201).json({ user })
        })
        .catch((err) => {
            res.status(400).json({
                error: err.message
            })
        })      
    }
    

// signinmethods 
const findUser = (userReq) => {
    return database.raw("SELECT * FROM users WHERE username = ?", [userReq.username])
    .then((data) => data.rows[0])
}

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
      bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
          if (err) {
            reject(err)
          }
          else if (response) {
            resolve(response)
          } else {
            reject(new Error('Passwords do not match.'))
          }
      })
    )
  }

const updateUserToken = (token, user) => {
    return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token", [token, user.id])
        .then((data) => data.rows[0])
    }
         



const signin = (req, res) => {
    const userReq = req.body
    let user

    findUser(userReq)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(token => updateUserToken(token, user))
        .then(() => {
            delete user.password_digest
            res.status(200).json(user)
        })
        .catch((error) => res.send({error: "username or password are incorrect, try again"}))
}

// authentication function

const findByToken = (token) => {
    return database.raw("SELECT * FROM users WHERE token = ?", [token])
    .then((data) => data.rows[0])
}

const authenticate = (userReq) => {
    findByToken(userReq.token)
    .then((user) => {
        if (user.username == userReq.username) {
            return true
        } else {
            return false
        }
    })
}







module.exports = {
    signup,
    signin,
    authenticate
}