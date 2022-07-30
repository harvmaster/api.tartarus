'use strict'

const express = require('express')
const router = express.Router()

class RootRoute {
  constructor () {
    router.get('/', (req, res) => { res.send({ status: 'OK' }) })
    router.use('/users', require('./users'))
    router.use('/rooms', require('./rooms'))

    return router
  }
}
module.exports = new RootRoute()