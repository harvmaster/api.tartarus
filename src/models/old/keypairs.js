const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

// Database information required
var schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publicKey: { // Public key of a user
    type: String,
  },
  privateKey: { // Encrypted with user's password (client-side)
    type: String
  },
  secretHash: {
    type: String
  },
  exposed: {
    type: Date,
    default: null
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

schema.statics.findPublicKeys = async function (userId) {
  const keys = await KeyPair.find({ user: userId })
  const publicKeys = keys.map(({ publicKey, create_date }) => ({ publicKey, create_date }))
                         .sort((a, b) => a.create_date - b.create_date)

  return publicKeys
}

schema.methods.toAuthJSON = function(user) {
    return {
        id: this.id,
        user: this.user,
        privateKey: this.privateKey,
        publicKey: this.publicKey,
        secretHash: this.secretHash,
        created: this.create_date,
        exposed: this.exposed
    }
};

schema.methods.toJSON = function () {
    return {
      publicKey: this.publicKey
    }
}

//Access outside of the file
var KeyPair = module.exports = mongoose.model('KeyPair', schema);
