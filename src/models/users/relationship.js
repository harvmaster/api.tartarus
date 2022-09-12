const mongoose = require('mongoose');

const schemaName = 'Relationship'
const schema = mongoose.Schema({
  users: {
    type: Array,
    of: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  status: String,

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Relationship = module.exports = mongoose.model(schemaName, schema)