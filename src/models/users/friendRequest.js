const mongoose = require('mongoose');

const schemaName = 'FriendRequest'
const schema = mongoose.Schema({
  sender: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'user'
  },
  recipient: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'user'
  },
  status: String,
  
  create_date: {
    type: Date,
    default: Date.now
  }
})

const friendRequest = module.exports = mongoose.model(schemaName, schema)