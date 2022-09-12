const mongoose = require('mongoose');

const schemaName = 'Role'
const schema = mongoose.Schema({
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  name: String,
  colour: String,         // css valid Hex code
  permissions: Number,    // however the hell the permission number system works
  hierarchy: Number,      // Determines what other roles this role can edit (eg. dont want an admin to be able to edit owner role)

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Role = module.exports = mongoose.model(schemaName, schema)