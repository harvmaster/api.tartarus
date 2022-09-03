const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const Participants = require('./participants')
const Messages = require('./messages')
const Keys = require('./keys')
const keypairs = require('./keypairs')
const Users = require('./users')

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

schema.statics.getUsersChannels = async function (user, getMessages = false) {
  // get the owner of the pubkey
  // const user = await Users.getFromPublicKey(pubkey)
  let channels = await Participants.find({ userId: user })
  channels = await Promise.all(channels.map(channel => Channel.findById(channel.channelId)))
  console.log(channels)
  if (getMessages) channels = channels.map(channel => channel.toFull())
  else channels = channels.map(channel => channel.toJSON())
  channels = await Promise.all(channels)

  return channels
}

schema.methods.addParticipant = async function (pubkey) {
  try {
    // console.log(Users.find({}))
    console.log(pubkey)
    const key = await keypairs.findOne({ publicKey: pubkey })
    console.log('user')
    console.log(key.user)
    let participant = new Participants({
      channelId: this.id,
      user: key.user
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

schema.methods.getParticipants = async function () {
  let participants = await Participants.find({ channelId: this.id })
  // console.log(participants)

  participants = participants.map(p => mongoose.model('User').findById(p.user))
  participants = await Promise.all(participants)
  // console.log(participants)
  participants = participants.map(p => p.toJSON())
  participants = await Promise.all(participants)

  // console.log(participants)

  return participants
}

schema.methods.getMessages = async function ({ limit = 100, offset = 0 }, user) {
  const messages = Messages.find({ channelID: this.id }).sort({ 'create_date': -1 }).skip(offset).limit(limit)
  
  let keys = []
  if (!!user) {
    const keyHashes = [...new Set(messages.map(message => message.keyHash))]
    keys = keyHashes.map(hash => Keys.find({ hash, owner: user }))
    await Promise.all(keysPromise)
    keys = keys.map(key => key.toJSON())
  }

  return {
    total: messages.count(),
    keys,
    messages
  }
}

schema.methods.toJSON = async function () {
  const participants = await this.getParticipants()

  return {
    id: this.id,
    roomId: this.roomId,
    type: this.type,
    name: this.name,
    created: this.create_date,
    participants
  }
}

schema.methods.toFull = async function (messageOptions, user) {
  const participant = this.getParticipants()
  const messages = this.getMessages(messageOptions, user)
  await Promise.all(participant, messages)
  messages.messages = messages.messages.map(({ id, sender, content, keyHash, created }) => ({ id, sender, content, keyHash, created }))
  return {
    id: this.id,
    rooom: this.roomId,
    type: this.type,
    name: this.name,
    created: this.create_date,
    participant,
    messages
  }
}

//Access outside of the file
var Channel = module.exports = mongoose.model('Channel', schema);
