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
    channels = channels.map(channel => channel.toJSON())

    return channels
  } catch (err) {
    console.error(err)
  }
}

schema.methods.toAuthJSON = function(user) {
    return {
        id: this.id,
        name: this.name,
    }
};

schema.methods.toJSON = function () {
    return {
        name: this.name.first,
    }
}

//Access outside of the file
var Room = module.exports = mongoose.model('room', schema);
