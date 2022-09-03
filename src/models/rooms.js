const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const Channels = require('./channels')
const Participants = require('./participants')

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

schema.methods.getAllParticipants = async function () {
  const channels = await this.getChannels()
  // let participants = channels.map(channel => channel.getParticipants())
  let participants = channels.map(channel => Participants.find({channelId: channel.id}))
  participants = await Promise.all(particpants)

  participants = [...new Set(participants.map(p => p.user))]
  participants = participants.map(p => mongoose.model('User').findById(p))
  participants = await Promise.all(participants)

  participants = participants.map(p => p.toJSON())
  participants = await Promise.all(participants)

  console.log(participants)

  return participants
}

schema.methods.addChannel = async function ({ name, type, participants }) {
  try {
    let channel = new Channels({
      roomId: this.id,
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
    created: this.create_date,
    channels
  }
};

schema.methods.toJSON = async function () {
  let channels = await this.getChannels()
  channels = channels.map(channel => channel.toJSON())
  channels = await Promise.all(channels)

  return {
    id: this.id,
    name: this.name,
    created: this.create_date,
    channels
  }
}

//Access outside of the file
var Room = module.exports = mongoose.model('Room', schema);
