'use strict'

const express = require('express')
const router = express.Router()

// Auth
const Auth = require('../../auth')

// models - for the database info
const Rooms = require('../../models/rooms')
const Participants = require('../../models/participants')
const Users = require('../../models/users')

class RoomRoute {
  // Define the routes
  constructor () {
    // Get Routes
    router.get('/:room', Auth.required, this.getRoom)

    // Post Routes
    router.post('/create', Auth.required, this.createRoom)
    // router.post('/login', this.loginUser)

    return router
  }

  // Get a room user back with its channels
  async getRoom(req, res) {
    const room = await RoomsById.find(req.params.room)
    if (!room) {
      return res.status(204).send('No room found')
    }
    const channels = room.getChannels()
    room = room.toJSON()
    room.channels = channels
    res.status(200).send(room)
  }  
  
  // Create a new room
  async createRoom(req, res) {
    const userId = req.user
    const user = await Users.findById(userId)
    const body = req.body.room

    // Create room
    const room = new Rooms({
      name: body.name
    })

    // save room to database
    let created
    try {
      created = await room.save()
      console.log('Created Room', created.name)
      
      // res.send(created)
    } catch (error) {
      console.error(error)
      return res.status(500).send('A problem occured trying to save the room')
    }

    room.addChannel({
      name: 'general',
      participants: user.publicKey
    })

    return res.send(room)

  }
}

module.exports = new RoomRoute()
