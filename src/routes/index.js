'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true })

import findServer from '../models/utils/serverMiddleware'

import serverRoutes from './servers'
import userRoutes from './users'
import channelRoutes from './channels'

class RootRoute {
  constructor () {
    router.get('/', (req, res) => { res.send({ status: 'OK' }) })
    router.use('/servers', serverRoutes)
    router.use('/users', userRoutes)
    router.use('/:server/channels', findServer, channelRoutes)
    // router.use('/rooms', require('./rooms'))

    return router
  }
}
module.exports = new RootRoute()