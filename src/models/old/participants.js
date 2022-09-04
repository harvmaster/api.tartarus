const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken');
var secret = require('../../config').jwt.secret

const Users = require('./users')
const Channels = require('./channels');

// Database information required
var schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel' 
  },
  // role: { // No clue how to implement roles yet. we'll get to it
    
  // },
  create_date:{
    type: Date,
    default: Date.now
  }
});

schema.methods.getUser = async function () {
  // const user = await Users.findById(this.userId)
  const participant = await Participant.findById(this.id).populate('user')
  const user = participant.user
  return user
}

schema.methods.getChannel = async function () {
  const channel = await Channels.findById(this.channelId)
  return channel
}

schema.methods.toJSON = async function () {
  // const user = await this.getUser()
  // console.log(user)
  // const user = await this.getUser().toJSON()
  // const channel = await this.getChannel().toJSON()
  const user = this.user
  const channel  = this.channelId
  return {
    user,
    channel 
  }
}

//Access outside of the file
var Participant = module.exports = mongoose.model('Participant', schema);
