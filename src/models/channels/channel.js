const mongoose = require('mongoose');

const schemaName = 'Channel'
const schema = mongoose.Schema({
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Server'
  },
  permittedRoles: {
    type: Array,
    of: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  name: String,
  type: String,   // 'Text' or 'Voice'
  shortId: String,

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Channel = module.exports = mongoose.model(schemaName, schema)