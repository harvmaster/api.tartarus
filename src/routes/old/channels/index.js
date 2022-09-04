'use strict'

const express = require('express')
const router = express.Router()

// Auth
const Auth = require('../../auth')

// models - for the database info
const Rooms = require('../../models/rooms')
const Participants = require('../../models/participants')
const Users = require('../../models/users')
const Channels = require('../../models/channels')

class ChannelRoute {
  // Define the routes
  constructor () {
    // Get Routes
    router.get('/:channel', Auth.required, this.getChannel)

    // Post Routes
    router.post('/create/:room', Auth.required, this.createChannel)
    // router.post('/login', this.loginUser)

    return router
  }

  // Get a room user back with its channels
  async getChannel(req, res) {
    const room = await RoomsById.find(req.params.room)
    if (!room) {
      return res.status(204).send('No room found')
    }
    const channels = room.getChannels()
    room = room.toJSON()
    room.channels = channels
    res.status(200).send(room)
  }  
  
  // Create a new Channel
  async createChannel(req, res) {
    const userId = req.auth.id
    const user = await Users.findById(userId)
    // console.log(user)
    const body = req.body.channel

    const room = await Rooms.findById(req.params.room)
    if (!room) return res.status(400).send('There is no room with that Id')

    // Create channel
    const channel = new Channels({
      roomId: req.params.room,
      name: body.name,
      type: body.type
    })

    // save channel to database
    let created
    try {
      created = await channel.save()
      console.log('Created channel', created.name)
    } catch (error) {
      console.error(error)
      return res.status(500).send('A problem occured trying to save the channel')
    }

    const pubKeys = await user.getPublicKeys()
    console.log(pubKeys)

    await room.addChannel({
      name: 'general',
      type: 'text',
      participants: pubKeys[0].publicKey
    })

    return res.send({ room: await room.toJSON() })

  }
}

module.exports = new ChannelRoute()
