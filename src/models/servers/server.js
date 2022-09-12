const mongoose = require('mongoose');

const schemaName = 'Server'
const schema = mongoose.Schema({
  name: String,
  description: String,
  shortId: String,
  defaultRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  avatar: {
    image: {
      type: Buffer,
    },
    mimeType: String
  },
  // image: Buffer
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Server = module.exports = mongoose.model(schemaName, schema)