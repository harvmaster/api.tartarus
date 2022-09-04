const mongoose = require('mongoose');

const schemaName = 'Key'
const schema = mongoose.Schema({
  // We dont need channel here as it can be interpreted from the messages in the channel
  publicKey: String,    // String is used here as a user can have multiple keypairs with the same public key. This can happen if a user changes his password and allows them to keep the old private/public keys
  key: String,          // base58 encoded, encrypted with users public Key ^
  keyHash: String,      // Base58 encoded
  exposed: Date,        // Date is used to know if the key may have gotten leaked (ie. user leaves a server and still has access to a key)

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Key = module.exports = mongoose.model(schemaName, schema)