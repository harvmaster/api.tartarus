const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const Keys = require('./keys')

// Database information required
var schema = mongoose.Schema({
  sender: { // Should be a public key probably
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  channelID: { // The channel this message was posted in
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel' 
  },
  content: { // Encrypted using the Key
    type: String,
    default: 'text'
  },
  keyHash: { // hash of the key used to encrypt the message. Allows for users to find the required encrypted key for them to decrypt with
    type: String
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

// Pubkey is referring to a users public key as each AES key is encrypted with a users public key
schema.methods.getKey = async function (pubkey = '') {
  const key = await Keys.find({ hash: this.keyHash, owner: pubkey })
  return key
}

schema.methods.toJSON = function () {
  return {
    id: this.id,
    sender: this.sender,
    channel: this.channel,
    content: this.content,
    keyHash: this.keyHash,
    created: this.create_date
  }
}

//Access outside of the file
var Message = module.exports = mongoose.model('Message', schema);
