const mongoose = require('mongoose');

const schemaName = 'Server'
const schema = mongoose.Schema({
  name: String,
  description: String,
  defaultRole: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'Role'
  },
  // image: Buffer
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Server = module.exports = mongoose.model(schemaName, schema)