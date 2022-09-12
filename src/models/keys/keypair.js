const mongoose = require('mongoose');

const schemaName = 'KeyPair'
const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  publicKey: String,      // base58 encoded
  privateKey: String,     // base58 encoded, encrypted with secretKey (before hash. ie. client side)
  secretKey: String,      // Base58 encoded hash of the key used to encrypt the private key
  exposed: Date,          // Date for when the key was exposed. (ie. user changes their password)

  create_date: {
    type: Date,
    default: Date.now
  }
})

const KeyPair = module.exports = mongoose.model(schemaName, schema)