'use strict'

const express = require('express')
const router = express.Router()

// models - for the database info
const Users = require('../../models/users')
const KeyPairs = require('../../models/keypairs')

const { requireBodyKeys } = require('../../utils')

class UserRoute {
  // Define the routes
  constructor () {
    // Get Routes
    router.get('/purge', this.purgeUsers)
    router.get('/:user', this.getUser)

    // Post Routes
    router.post('/', requireBodyKeys('username email password privateKey publicKey', 'user'), this.createUser)
    router.post('/login', requireBodyKeys('email password', 'user'), this.loginUser)

    return router
  }

  async purgeUsers (req, res) {
    const users = await Users.deleteMany({})
    Users.dropTable()
    return res.send('Deleted Users')
  }

  // Get all of the users and return a formatted array
  async getUsers(req, res) {
    const users = await Users.find()
    const users_formatted = users.map(user => {
        return user.toJSON()
    })
    res.status(200).send(users_formatted)
  }

  // Get a single user back
  async getUser(req, res) {
    const user = await Users.find({name: req.params.user})
    if (!user) {
      return res.status(204).send('No user with that name')
    }
    user = user.toJSON()
    res.status(200).send(user)
  }  
  
  async loginUser (req, res) {
    const body = req.body.user

    // Find user and then check their password
    const user = await Users.findOne({ email: body.email })
    if (!user?.validPassword(body.password)) return res.status(401).send('Username or Password incorrect')

    const response = await user.toAuthJSON()

    // Return the user to ther client
    res.status(200).send(response)
  }

  // Create a new user
  async createUser(req, res) {
    const body = req.body.user
    const { privateKey, publicKey } = body

    if (await Users.isEmailTaken(body.email) ) return res.status(409).send('Email is already taken') 
    
    // Create user
    const user = new Users({
      username: body.username,
      email: body.email,
    })
    user.setPassword(body.password)
    await user.generateAccountCode()

    // save user to database
    const created = await user.save().catch((err) => console.error(err))
    if (!created) return res.status(500).send('A problem occured trying to save the user')
    console.log('Created User')
    
    const keys = await created.createKeyPair(privateKey, publicKey)
    if (!keys) return res.status(500).send('A problem occured trying to save the user\'s keypair') 

    return res.status(201).send({ ...created, ...keys })

  }
}

module.exports = new UserRoute()
