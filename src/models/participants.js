const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

// Database information required
var schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel' 
  },
  // role: { // No clue how to implement roles yet. we'll get to it
    
  // },
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
var Participant = module.exports = mongoose.model('Participant', schema);
