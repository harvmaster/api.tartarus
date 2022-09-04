const mongoose = require('mongoose');

const schemaName = 'Membership'
const schema = mongoose.Schema({
  server: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'Server'
  },
  user: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },
  roles: {
    type: Array,
    of: {
      type: mongoose.schema.Types.ObjectId,
      ref: 'Role'
    }
  },

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Membership = module.exports = mongoose.model(schemaName, schema)