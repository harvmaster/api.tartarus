const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const Participants = require('./participants')

// Database information required
var schema = mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room'
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

schema.methods.addParticipant = async function (pubkey) {
  try {
    let participant = new Participants({
      roomId: this.roomId,
      channelId: this.id,
      user: pubkey
    })

    await participant.save()
    console.log('added participant')
  } catch (err) {{
    console.error(err)
    throw err
  }}
}

schema.methods.addParticipants = async function (pubkeys) {
  try {
    if (!Array.isArray(pubkeys)) return this.addParticipant(pubkeys)

    const promises = pubkeys.forEach(key => this.addParticipant(key))
    let participants = await Promise.all(promises)

    return participants
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
var Channel = module.exports = mongoose.model('Channel', schema);
