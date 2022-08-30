const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken');
var secret = require('../../config').jwt.secret

const Users = require('./users')
const Channels = require('./channels');

// Database information required
var schema = mongoose.Schema({
  userId: {
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
  const user = await Users.findById(this.userId)
  return user
}

schema.methods.getChannel = async function () {
  const channel = await channels.findById(this.channelId)
  return channel
}

schema.methods.toJSON = async function () {
  const user = await this.getUser().toJSON()
  const channel = await this.getChannel().toJSON()
  return {
    user,
    channel 
  }
}

//Access outside of the file
var Participant = module.exports = mongoose.model('Participant', schema);
