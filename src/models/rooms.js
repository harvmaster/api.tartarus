const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const Channels = require('./channels')

// Database information required
var schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

schema.methods.addChannel = async function ({ name, type, participants }) {
  try {
    let channel = new Channels({
      name,
      type
    })
    await channel.save()

    channel.addParticipants(participants)

  } catch (err) {

  }
}

schema.methods.getChannels = async function (format) {
  try {
    let channels = await Channels.find({ roomId: this.id })
    // channels = channels.map(channel => channel.toJSON())

    return channels
  } catch (err) {
    console.error(err)
  }
}

schema.methods.toFull = async function() {
  let channels = await this.getChannels()
  channels = channels.map(channel => channel.toFull())
  await Promise.all(channels)

  return {
    id: this.id,
    name: this.name,
    channels
  }
};

schema.methods.toJSON = async function () {
  let channels = await this.getChannels()
  channels = channels.map(channel => channel.toJSON())
  await Promise.all(channels)

  return {
    id: this.id,
    name: this.name,
    channels
  }
}

//Access outside of the file
var Room = module.exports = mongoose.model('Room', schema);
