const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

// Database information required
var schema = mongoose.Schema({
  type: {
    type: String,
    default: 'text'
  },
  ownerKey: { // Public key of a user
    type: String,
  },
  key: { // Encrypted with the Public Key of who the key is intended for (ownerKey), decrypt with the owner's private key
    type: String
  },
  hash: { // hash of the unencrypted key. This is reference in Message so a user can locate which key to use to decrypt a messsage
    type: String
  },
  exposed: {
    type: Boolean
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

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
