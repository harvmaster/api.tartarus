const mongoose = require('mongoose');

const schemaName = 'Mention'
const schema = mongoose.Schema({
  sender: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },
  mentioned: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },

  message: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'Message'
  },

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Mention = module.exports = mongoose.model(schemaName, schema)