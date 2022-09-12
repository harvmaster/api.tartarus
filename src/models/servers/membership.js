const mongoose = require('mongoose');

const schemaName = 'Membership'
const schema = mongoose.Schema({
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Server'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  roles: {
    type: Array,
    of: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  nickname: String,

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Membership = module.exports = mongoose.model(schemaName, schema)