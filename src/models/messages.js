const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

// Database information required
var schema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  channelID: {
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
var Message = module.exports = mongoose.model('Message', schema);
